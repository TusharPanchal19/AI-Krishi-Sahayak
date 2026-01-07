from flask import Flask, render_template, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os
from werkzeug.utils import secure_filename
import base64
from io import BytesIO
from PIL import Image

app = Flask(__name__)

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

# IMPORTANT: Ensure your model file is in a path accessible by the application.
# The absolute path below has been commented out and replaced with a relative path for portability.
# MODEL_PATH = r"C:\Users\ATUL\Desktop\Pneumonia\model\pneumonia_model.keras"
MODEL_PATH = r"C:\Users\ATUL\Desktop\Pneumonia\model\pneumonia_model.keras"

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024 # 16MB max file size

# Create upload folder if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

try:
    # Load model once at startup
    model = load_model(MODEL_PATH)
    print("Model loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")
    # Handle error if model is not found or corrupted
    model = None

def allowed_file(filename):
    """Check if the uploaded file has an allowed extension."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def predict_pneumonia(img_path, target_size=(150, 150)):
    """Predict pneumonia from X-ray image using the loaded model."""
    if model is None:
        raise Exception("ML Model not loaded.")

    # Load and preprocess the image
    img = image.load_img(img_path, target_size=target_size)
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) # Add batch dimension
    img_array = img_array / 255.0 # Normalize

    prediction = model.predict(img_array)[0][0]

    # Interpret the prediction (assuming binary classification: 0=Normal, 1=Pneumonia)
    if prediction > 0.5:
        result = "Pneumonia Detected"
        confidence = prediction * 100
    else:
        result = "Normal"
        confidence = (1 - prediction) * 100

    return result, confidence

@app.route('/')
def index():
    """Renders the main frontend HTML page."""
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    """Handles image upload and returns prediction results via JSON."""
    if model is None:
        return jsonify({'error': 'Machine learning model failed to load. Check server logs.'}), 500

    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    if file and allowed_file(file.filename):
        # Securely save the file
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        
        try:
            file.save(filepath)
            
            # Run the prediction
            result, confidence = predict_pneumonia(filepath)
            
            # Convert image to base64 for display in the frontend
            img = Image.open(filepath)
            buffered = BytesIO()
            img.save(buffered, format="PNG")
            img_str = base64.b64encode(buffered.getvalue()).decode()
            
            # Clean up uploaded file
            os.remove(filepath)
            
            return jsonify({
                'result': result,
                'confidence': round(confidence, 2),
                'image': img_str
            })
        
        except Exception as e:
            # Clean up file in case of error during prediction/processing
            if os.path.exists(filepath):
                os.remove(filepath)
            return jsonify({'error': f'An unexpected error occurred: {str(e)}'}), 500

    return jsonify({'error': 'Invalid file type. Please upload PNG, JPG, or JPEG X-ray images.'}), 400

if __name__ == '__main__':
    # Running in debug mode for development
    app.run(debug=True, port=5000)
