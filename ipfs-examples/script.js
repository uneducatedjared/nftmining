// 配置Pinata API（需替换为您的密钥）
const PINATA_API_KEY = '4bda2a12508a1c58f33b';
const PINATA_SECRET = '020a8215c8006d273e7a33934419544d969670716622a2763b5feee76cf1e7cb';

document.getElementById('ipfsUpload').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 图片预览
    const preview = document.getElementById('imagePreview');
    const reader = new FileReader();
    reader.onload = (e) => {
        preview.src = e.target.result;
        document.querySelector('.preview-container').style.display = 'block';
    };
    reader.readAsDataURL(file);

    // 上传至IPFS
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
            method: 'POST',
            headers: {
                'pinata_api_key': PINATA_API_KEY,
                'pinata_secret_api_key': PINATA_SECRET
            },
            body: formData
        });

        const data = await response.json();
        const cid = data.IpfsHash;
        
        // 显示结果
        document.getElementById('ipfsHash').textContent = `ipfs://${cid}`;
        document.getElementById('ipfsHash').href = `https://gateway.pinata.cloud/ipfs/${cid}`;
    } catch (error) {
        console.error('上传失败:', error);
        alert('上传失败，请检查控制台日志');
    }
});

// 复制功能
function copyHash() {
    const hashElement = document.getElementById('ipfsHash');
    navigator.clipboard.writeText(hashElement.textContent);
    alert('地址已复制到剪贴板！');
}