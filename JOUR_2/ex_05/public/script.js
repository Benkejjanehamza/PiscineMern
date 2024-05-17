const urlParams = new URLSearchParams(window.location.search);
const success = urlParams.get('success');
const resultDiv = document.getElementById('result');

if (success === 'true') {
    resultDiv.innerText = 'Collection saved';
    resultDiv.className = 'success';
} else if (success === 'false') {
    resultDiv.innerText = 'Failed to save collection. Please try again.';
    resultDiv.className = 'error';
}