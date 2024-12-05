// DOM元素
const apiKeyInput = document.getElementById('apiKeyInput');
const verifyBtn = document.getElementById('verifyBtn');
const errorMessage = document.getElementById('errorMessage');

// 检查是否已经有存储的API密钥
const storedApiKey = localStorage.getItem('deepseekApiKey');
if (storedApiKey) {
    window.location.href = 'index.html';
}

// 验证API密钥
async function verifyApiKey(apiKey) {
    try {
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [
                    {
                        role: "user",
                        content: "测试消息"
                    }
                ]
            })
        });

        if (response.ok) {
            return true;
        }
        return false;
    } catch (error) {
        console.error('验证API密钥时出错:', error);
        return false;
    }
}

// 处理验证按钮点击
verifyBtn.addEventListener('click', async () => {
    const apiKey = apiKeyInput.value.trim();
    if (!apiKey) {
        errorMessage.style.display = 'block';
        return;
    }

    verifyBtn.disabled = true;
    verifyBtn.textContent = '验证中...';
    
    const isValid = await verifyApiKey(apiKey);
    
    if (isValid) {
        localStorage.setItem('deepseekApiKey', apiKey);
        window.location.href = 'index.html';
    } else {
        errorMessage.style.display = 'block';
        verifyBtn.disabled = false;
        verifyBtn.textContent = '验证并继续';
    }
}); 