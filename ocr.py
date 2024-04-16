import pytesseract
from PIL import Image, ImageEnhance
from openpyxl import Workbook
import os
import re
import cv2


pytesseract.pytesseract.tesseract_cmd = r'C:/Program Files/Tesseract-OCR/tesseract.exe'

def extract_text_from_image(image_path):
    img = Image.open(image_path)
    
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(1.5)
    
    img = img.resize((img.width * 2, img.height * 2), Image.LANCZOS)

    extracted_text = pytesseract.image_to_string(img)
    
    confidence = pytesseract.image_to_data(img, output_type=pytesseract.Output.DICT)
    avg_confidence = sum(map(float, confidence['conf'])) / len(confidence['conf']) if confidence['conf'] else 0
    # print("text ", extracted_text, avg_confidence)
    return extracted_text, avg_confidence

def find_name_licence_validity(text):
    lines = text.split('\n')
    name = ''
    licence_number = ''
    validity = ''
    lice=''

    # print("in fun", text)
    alphanumeric_pattern = re.compile(r'\b[A-Za-z0-9]{6,20}\b')  # Updated regex pattern
    #print("text", text)
    licence_keywords = ['licence number', 'dl no', 'dl number']

    for line in lines:
        # match_alphanumeric = alphanumeric_pattern.findall(line)

        # for potential_licence in match_alphanumeric:
            # print("licence", potential_licence)

            # if 9 <= len(potential_licence) <= 20:
            #     # print("licence 2", potential_licence)
            #     licence_number = potential_licence
        if 'licence no.' in line.lower() or 'dl no' in line.lower()  and '=' not in line:
            licence_number = line.split(':')[-1].strip()
            licence_number = line.split(';')[-1].strip()
            for i in licence_number:
                if(i!='(' or i!=' '):
                    lice+=i
                else:
                    break

        if 'valid' in line.lower() or 'expiry' in line.lower() or 'valid till' in line.lower():
            validity = line.split(':')[-1].strip()
            validity = line.split(';')[-1].strip()

        if 'name' in line.lower() and '=' not in line:
            name = line.split(':')[-1].strip() 


        for keyword in licence_keywords:
            if keyword in line.lower() and '=' not in line:
                licence_number = line.split(':')[-1].strip()
              
    return name, lice, validity

def extract_license_number(image_path):
    print("comes in fun")
    img = cv2.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    _, binary_img = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)

    contours, _ = cv2.findContours(binary_img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    for contour in contours:
        x, y, w, h = cv2.boundingRect(contour)
        
        if 0.5 < w / h < 2.0 and 50 < w < 300 and 10 < h < 100:
            license_region = gray[y:y + h, x:x + w]
            
            extracted_text = pytesseract.image_to_string(license_region)
            if extracted_text.strip():
                return extracted_text.strip()

    return None

def template_matching_license_number(img):
    template_img = cv2.imread(r"C:/Users/shraddha/OneDrive/Desktop/Works/main3.png", cv2.IMREAD_GRAYSCALE)

    result = cv2.matchTemplate(img, template_img, cv2.TM_CCOEFF_NORMED)
    min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)

    x, y = max_loc
    w, h = template_img.shape[::-1]
    license_region = img[y:y + h, x:x + w]

    extracted_text = pytesseract.image_to_string(license_region)
    return extracted_text.strip()


folder_path = r"C:/Users/shraddha/OneDrive/Desktop/Projg"
image_files = [f for f in os.listdir(folder_path) if f.endswith(('.jpg', '.png', '.jpeg'))]

row_idx = 2
wb = Workbook()
ws = wb.active
ws.cell(row=1, column=1, value='Name')
ws.cell(row=1, column=2, value='Licence Number')
ws.cell(row=1, column=3, value='Validity')

for image_file in image_files:
    image_path = os.path.join(folder_path, image_file)

    extracted_text, confidence = extract_text_from_image(image_path)

    if confidence < 40:
        print(f"Warning: Image {image_file} may be blurred or extraction failed (confidence: {confidence})")
        print(f"Upload another copy of the image")
        continue

    name, licence_number, validity = find_name_licence_validity(extracted_text)

    if not licence_number:
        licence_number = extract_license_number(image_path)

    ws.cell(row=row_idx, column=1, value=name)
    ws.cell(row=row_idx, column=2, value=licence_number)
    ws.cell(row=row_idx, column=3, value=validity)

    row_idx += 1

output_file = r'C:/Users/shraddha/OneDrive/Desktop/SANDIP/License_9.xlsx'
wb.save(output_file)

print(f"License information extracted and saved to {output_file}")