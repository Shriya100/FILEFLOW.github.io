// Global variables
let uploadedFiles = [];
let currentAction = '';
let processedFile = null;

// DOM elements
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const processingOptions = document.getElementById('processingOptions');
const filePreview = document.getElementById('filePreview');
const conversionControls = document.getElementById('conversionControls');
const downloadSection = document.getElementById('downloadSection');
const processBtn = document.getElementById('processBtn');
const downloadBtn = document.getElementById('downloadBtn');
const qualitySlider = document.getElementById('quality');
const qualityValue = document.getElementById('qualityValue');
const outputFormat = document.getElementById('outputFormat');
const widthInput = document.getElementById('width');
const heightInput = document.getElementById('height');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    updateNavigation();
});

function initializeEventListeners() {
    // File upload events
    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
    fileInput.addEventListener('change', handleFileSelect);

    // Processing option events
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', () => selectProcessingOption(btn.dataset.action));
    });

    // Control events
    qualitySlider.addEventListener('input', updateQualityValue);
    processBtn.addEventListener('click', processFiles);
    downloadBtn.addEventListener('click', downloadProcessedFile);

    // Navigation events
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            document.querySelector(target).scrollIntoView({
                behavior: 'smooth'
            });
            updateActiveNavLink(link);
        });
    });

    // Scroll event for navigation
    window.addEventListener('scroll', updateNavigationOnScroll);
}

function updateNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNavLink(activeLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }
    
    window.updateActiveNavLink = updateActiveNavLink;
}

function updateNavigationOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

function scrollToUpload() {
    document.querySelector('.upload-section').scrollIntoView({
        behavior: 'smooth'
    });
}

// Drag and drop handlers
function handleDragOver(e) {
    e.preventDefault();
    uploadArea.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
}

function handleFileSelect(e) {
    const files = Array.from(e.target.files);
    handleFiles(files);
}

function handleFiles(files) {
    uploadedFiles = files.filter(file => {
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];
        return validTypes.includes(file.type);
    });

    if (uploadedFiles.length === 0) {
        alert('Please select valid image or PDF files.');
        return;
    }

    displayFilePreview();
    showProcessingOptions();
}

function displayFilePreview() {
    filePreview.innerHTML = '';
    
    uploadedFiles.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        
        if (file.type.startsWith('image/')) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                // Set default dimensions based on original image
                if (index === 0) {
                    widthInput.value = img.naturalWidth;
                    heightInput.value = img.naturalHeight;
                }
            };
            fileItem.appendChild(img);
        } else {
            const icon = document.createElement('i');
            icon.className = 'fas fa-file-pdf';
            icon.style.fontSize = '3rem';
            icon.style.color = '#e74c3c';
            fileItem.appendChild(icon);
        }
        
        const fileName = document.createElement('div');
        fileName.className = 'file-name';
        fileName.textContent = file.name;
        fileItem.appendChild(fileName);
        
        const fileSize = document.createElement('div');
        fileSize.className = 'file-size';
        fileSize.textContent = formatFileSize(file.size);
        fileSize.style.fontSize = '0.8rem';
        fileSize.style.color = '#64748b';
        fileItem.appendChild(fileSize);
        
        filePreview.appendChild(fileItem);
    });
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function showProcessingOptions() {
    processingOptions.style.display = 'block';
    filePreview.style.display = 'grid';
}

function selectProcessingOption(action) {
    currentAction = action;
    
    // Update button states
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-action="${action}"]`).classList.add('active');
    
    // Show conversion controls
    conversionControls.style.display = 'block';
    
    // Update format options based on action
    updateFormatOptions(action);
}

function updateFormatOptions(action) {
    const formatSelect = document.getElementById('outputFormat');
    formatSelect.innerHTML = '';
    
    if (action === 'compress' || action === 'resize') {
        // Keep original format options for compression/resize
        const formats = [
            { value: 'jpeg', text: 'JPEG' },
            { value: 'png', text: 'PNG' },
            { value: 'webp', text: 'WebP' }
        ];
        
        formats.forEach(format => {
            const option = document.createElement('option');
            option.value = format.value;
            option.textContent = format.text;
            formatSelect.appendChild(option);
        });
    } else if (action === 'convert') {
        // All conversion options
        const formats = [
            { value: 'jpeg', text: 'JPEG' },
            { value: 'png', text: 'PNG' },
            { value: 'webp', text: 'WebP' },
            { value: 'pdf', text: 'PDF' }
        ];
        
        formats.forEach(format => {
            const option = document.createElement('option');
            option.value = format.value;
            option.textContent = format.text;
            formatSelect.appendChild(option);
        });
    }
}

function updateQualityValue() {
    qualityValue.textContent = qualitySlider.value + '%';
}

async function processFiles() {
    if (uploadedFiles.length === 0 || !currentAction) {
        alert('Please select files and processing option first.');
        return;
    }
    
    // Show loading state
    processBtn.innerHTML = '<div class="loading"></div> Processing...';
    processBtn.disabled = true;
    
    try {
        const file = uploadedFiles[0]; // Process first file for demo
        const options = {
            format: outputFormat.value,
            quality: parseInt(qualitySlider.value) / 100,
            width: widthInput.value ? parseInt(widthInput.value) : null,
            height: heightInput.value ? parseInt(heightInput.value) : null
        };
        
        let result;
        
        if (file.type.startsWith('image/')) {
            result = await processImage(file, currentAction, options);
        } else if (file.type === 'application/pdf') {
            result = await processPDF(file, currentAction, options);
        }
        
        if (result) {
            processedFile = result;
            showDownloadSection();
        }
        
    } catch (error) {
        console.error('Processing error:', error);
        alert('Error processing file. Please try again.');
    } finally {
        // Reset button state
        processBtn.innerHTML = '<i class="fas fa-cog"></i> Process File';
        processBtn.disabled = false;
    }
}

async function processImage(file, action, options) {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
            try {
                // Calculate dimensions
                let { width, height } = calculateDimensions(
                    img.naturalWidth, 
                    img.naturalHeight, 
                    options.width, 
                    options.height,
                    action
                );
                
                canvas.width = width;
                canvas.height = height;
                
                // Draw image
                ctx.drawImage(img, 0, 0, width, height);
                
                // Convert to desired format
                const mimeType = getMimeType(options.format);
                const quality = action === 'compress' ? options.quality : 0.9;
                
                canvas.toBlob((blob) => {
                    if (blob) {
                        const fileName = generateFileName(file.name, options.format, action);
                        resolve({
                            blob: blob,
                            name: fileName,
                            originalSize: file.size,
                            newSize: blob.size
                        });
                    } else {
                        reject(new Error('Failed to process image'));
                    }
                }, mimeType, quality);
                
            } catch (error) {
                reject(error);
            }
        };
        
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = URL.createObjectURL(file);
    });
}

async function processPDF(file, action, options) {
    // For PDF processing, we'll just return the original file with a new name
    // In a real implementation, you might use PDF-lib or similar
    const fileName = generateFileName(file.name, 'pdf', action);
    
    return {
        blob: file,
        name: fileName,
        originalSize: file.size,
        newSize: file.size
    };
}

function calculateDimensions(origWidth, origHeight, targetWidth, targetHeight, action) {
    let width = origWidth;
    let height = origHeight;
    
    if (action === 'resize' && (targetWidth || targetHeight)) {
        if (targetWidth && targetHeight) {
            width = targetWidth;
            height = targetHeight;
        } else if (targetWidth) {
            width = targetWidth;
            height = (origHeight * targetWidth) / origWidth;
        } else if (targetHeight) {
            height = targetHeight;
            width = (origWidth * targetHeight) / origHeight;
        }
    } else if (action === 'compress') {
        // Reduce dimensions by 10% for compression
        width = Math.round(origWidth * 0.9);
        height = Math.round(origHeight * 0.9);
    }
    
    return { width, height };
}

function getMimeType(format) {
    const mimeTypes = {
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'webp': 'image/webp',
        'pdf': 'application/pdf'
    };
    return mimeTypes[format] || 'image/jpeg';
}

function generateFileName(originalName, format, action) {
    const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '');
    const actionSuffix = action === 'compress' ? '_compressed' : 
                        action === 'resize' ? '_resized' : '_converted';
    return `${nameWithoutExt}${actionSuffix}.${format}`;
}

function showDownloadSection() {
    downloadSection.style.display = 'block';
    
    // Update download info
    if (processedFile) {
        const compressionRatio = ((processedFile.originalSize - processedFile.newSize) / processedFile.originalSize * 100).toFixed(1);
        const infoText = document.querySelector('.download-card h3');
        
        if (currentAction === 'compress' && compressionRatio > 0) {
            infoText.textContent = `File compressed successfully! Reduced by ${compressionRatio}%`;
        } else {
            infoText.textContent = 'File processed successfully!';
        }
    }
    
    // Scroll to download section
    downloadSection.scrollIntoView({ behavior: 'smooth' });
}

function downloadProcessedFile() {
    if (!processedFile) {
        alert('No processed file available for download.');
        return;
    }
    
    const url = URL.createObjectURL(processedFile.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = processedFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Reset the form after download
    setTimeout(resetForm, 1000);
}

function resetForm() {
    uploadedFiles = [];
    currentAction = '';
    processedFile = null;
    
    // Reset UI
    filePreview.innerHTML = '';
    processingOptions.style.display = 'none';
    conversionControls.style.display = 'none';
    downloadSection.style.display = 'none';
    
    // Reset form values
    fileInput.value = '';
    qualitySlider.value = 80;
    qualityValue.textContent = '80%';
    widthInput.value = '';
    heightInput.value = '';
    
    // Remove active states
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('active');
    });
}

// Utility function for smooth scrolling
window.scrollToUpload = scrollToUpload;

// Service Worker registration for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
            