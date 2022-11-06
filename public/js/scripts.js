const initApp = () => {
    const dropArea = document.querySelector('.drag-and-drop');
    const fileSelector = document.querySelector('#file-selector');
    const body = document.body;

    const prevents = (e) => e.preventDefault();
    const active = () => dropArea.classList.add("drag-and-drop-dragenter");
    const inactive = () => dropArea.classList.remove("drag-and-drop-dragenter");

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evtName => {
        body.addEventListener(evtName, prevents);
    });
    
    ['dragenter', 'dragover'].forEach(evtName => {
        dropArea.addEventListener(evtName, active);
    });

    ['dragleave', 'drop'].forEach(evtName => {
        dropArea.addEventListener(evtName, inactive);
    });
    
    dropArea.addEventListener('drop', handleDrop);
    fileSelector.addEventListener('change', getSelectorFiles);
}

const handleDrop = async(e) => {  // Getting the file that was dropped
    const dt = e.dataTransfer;
    const files = dt.files;

    sendFile(files);
    // progressBar(files);
}

const getSelectorFiles = async() => {  // Getting the file that was selected
    const selectorFiles = document.querySelector('#file-selector').files;
    
    sendFile(selectorFiles);
    // progressBar(selectorFiles);
}

const sendFile = async(files) => {  // Sending the file to the backend

    showLoadingBar();

    const formData = new FormData();

    Object.keys(files).forEach(key => {
        formData.append(files.item(key).name, files.item(key));
    });

    const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
    });

    window.location.href = response.url;

}

function showLoadingBar() {
    const selectFileI = document.getElementById('select-file');
    const uploadingI = document.getElementById('uploading');

    selectFileI.style.display = "none";
    uploadingI.style.display = "block";
}

document.addEventListener("DOMContentLoaded", initApp);  // When the HTML content is fully loaded, call the function initApp