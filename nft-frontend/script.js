// 配置Pinata API（需替换为您的密钥）
const PINATA_API_KEY = '4bda2a12508a1c58f33b';
const PINATA_SECRET = '020a8215c8006d273e7a33934419544d969670716622a2763b5feee76cf1e7cb';
var imageData = '';
document.getElementById('file-input').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 图片预览
    const preview = document.getElementById('imagePreview');
    const reader = new FileReader();
    reader.onload = (e) => {
        preview.src = e.target.result;
        document.querySelector('.preview-image').style.display = 'block';
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
        imageData = `https://gateway.pinata.cloud/ipfs/${cid}`;

    } catch (error) {
        console.error('上传失败:', error);
        alert('上传失败，请检查控制台日志');
    }
});

document.querySelector('.mint-btn').addEventListener('click', async (e) => {
    const name = document.getElementById('nftName').value;
    const description = document.getElementById('nftDescription').value;
    // 构建json文件
    // 构建JSON对象并字符串化
    const jsonData = {
        "name": name,
        "description": description,
        "image": imageData
    };
    const jsonBlob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });

    // 创建FormData并附加文件
    const formData = new FormData();
    formData.append('file', jsonBlob, 'metadata.json'); // 指定文件名

    // 发送请求到Pinata
    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
            'pinata_api_key': PINATA_API_KEY,
            'pinata_secret_api_key': PINATA_SECRET
        },
        body: formData
    });
});


