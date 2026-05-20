from PIL import Image

def trim_and_square(im):
    # Get bounding box of alpha channel
    if 'A' in im.mode:
        bbox = im.split()[-1].getbbox()
    else:
        bbox = im.getbbox()
        
    if bbox:
        im = im.crop(bbox)
        
    # Make it square
    size = max(im.size)
    new_im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    # Paste to center
    new_im.paste(im, ((size - im.size[0]) // 2, (size - im.size[1]) // 2))
    return new_im

im = Image.open("src/app/icon.png")
squared = trim_and_square(im)
squared.save("src/app/icon.png")
squared.save("public/icon-garudaloka.png")
print(f"Original size: {im.size}, Squared size: {squared.size}")
