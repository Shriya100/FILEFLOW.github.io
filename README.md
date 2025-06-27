# FileFlow - Transform Your Files Instantly

A modern, client-side file processing web application that allows users to compress, convert, and resize images without uploading files to any server. All processing happens locally in the browser for maximum privacy and security.

## 🌟 Features

- **Image Compression**: Reduce file sizes while maintaining quality
- **Format Conversion**: Convert between JPEG, PNG, WebP, and PDF formats
- **Image Resizing**: Resize images to custom dimensions
- **Drag & Drop Interface**: Intuitive file upload experience
- **Real-time Preview**: See your files before processing
- **Privacy First**: All processing happens locally in your browser
- **Responsive Design**: Works on all devices and screen sizes
- **No Server Required**: Pure client-side application

## 🚀 Live Demo

[View Live Demo](https://your-username.github.io/fileflow)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/fileflow.git
cd fileflow
```

2. Open `index.html` in your browser or serve it using a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

3. Visit `http://localhost:8000` in your browser

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and Canvas API
- **CSS3**: Modern styling with Flexbox/Grid and animations
- **Vanilla JavaScript**: File processing and DOM manipulation
- **Font Awesome**: Icons
- **No external dependencies**: Pure client-side implementation

## 📁 Project Structure

```
fileflow/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── README.md           # Project documentation
├── .gitignore          # Git ignore file
├── LICENSE             # MIT License
└── assets/             # Images and icons (if any)
```

## 🎯 Usage

1. **Upload Files**: Drag and drop files or click to browse
2. **Choose Action**: Select compress, convert, or resize
3. **Configure Settings**: Adjust quality, dimensions, and output format
4. **Process**: Click the process button to transform your files
5. **Download**: Download your processed files instantly

## 🔧 Customization

### Adding New File Formats

To add support for new image formats, update the `validTypes` array in `script.js`:

```javascript
const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'your/new-format'];
```

### Modifying Compression Settings

Adjust compression ratios in the `calculateDimensions` function:

```javascript
// Reduce dimensions by 20% instead of 10%
width = Math.round(origWidth * 0.8);
height = Math.round(origHeight * 0.8);
```

### Styling Changes

All styles are contained in `styles.css`. The design uses CSS custom properties for easy theming:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #64748b;
    --background-color: #f8fafc;
}
```

## 🌐 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## 📝 API Reference

### Main Functions

- `handleFiles(files)`: Process uploaded files
- `processImage(file, action, options)`: Process individual images
- `calculateDimensions(origWidth, origHeight, targetWidth, targetHeight, action)`: Calculate new dimensions
- `downloadProcessedFile()`: Trigger file download

### Options Object

```javascript
{
    format: 'jpeg|png|webp|pdf',
    quality: 0.1-1.0,
    width: number|null,
    height: number|null
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Font Awesome for icons
- Modern CSS techniques and animations
- HTML5 Canvas API for image processing

## 🐛 Known Issues

- Large files (>50MB) may cause performance issues
- PDF processing is currently limited (placeholder implementation)
- Some browsers may have canvas size limitations

## 🔮 Future Enhancements

- [ ] Batch processing for multiple files
- [ ] Advanced image filters and effects
- [ ] PDF manipulation features
- [ ] Progress indicators for large files
- [ ] PWA support with offline functionality
- [ ] Export settings presets

## 📞 Support

If you encounter any issues or have questions, please [open an issue](https://github.com/your-username/fileflow/issues) on GitHub.

---

Made with ❤️ by [Your Name](https://github.com/your-username)