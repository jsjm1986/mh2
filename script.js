function showMessage(message, type = 'info') {
    // 创建消息容器
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-toast ${type}`;
    messageDiv.textContent = message;

    // 添加到页面
    document.body.appendChild(messageDiv);

    // 显示动画
    setTimeout(() => {
        messageDiv.classList.add('show');
    }, 100);

    // 3秒后移除
    setTimeout(() => {
        messageDiv.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 3000);
}

async function exportToPPT() {
    try {
        // 检查是否有场景可以导出
        if (!AppState.generatedScenes || AppState.generatedScenes.length === 0) {
            alert('没有可导出的场景');
            return;
        }

        // 创建新的PPT文档
        const pres = new PptxGenJS();
        
        // 设置PPT属性
        pres.author = '分镜头脚本生成器';
        pres.company = 'AI Storyboard Generator';
        pres.revision = '1';
        pres.subject = '分镜头脚本';
        pres.title = '故事分镜头脚本';

        // 添加封面
        const coverSlide = pres.addSlide();
        coverSlide.background = { color: '2d2d2d' };
        coverSlide.addText('故事分镜头脚本', {
            x: '10%',
            y: '40%',
            w: '80%',
            h: '20%',
            fontSize: 44,
            color: 'FFFFFF',
            bold: true,
            align: 'center'
        });

        // 为每个场景创建幻灯片
        for (const scene of AppState.generatedScenes) {
            const slide = pres.addSlide();
            
            // 添加场景标题
            slide.addText(`场景 ${scene.number}`, {
                x: '5%',
                y: '5%',
                w: '90%',
                h: '10%',
                fontSize: 24,
                bold: true,
                color: '2d2d2d'
            });

            // 创建内容布局
            const contentLayout = [
                { title: '�� 镜头构图', content: scene.content.镜头 },
                { title: '🌄 场景描述', content: scene.content.场景 },
                { title: '👥 人物表现', content: scene.content.人物 },
                { title: '💭 对话内容', content: scene.content.对话 },
                { title: '✨ 特殊效果', content: scene.content.效果 },
                { title: '🎬 分镜节奏', content: scene.content.节奏 }
            ];

            // 添加内容
            contentLayout.forEach((item, index) => {
                const yPos = 20 + (index * 13); // 垂直位置计算
                
                // 添加标题
                slide.addText(item.title, {
                    x: '5%',
                    y: `${yPos}%`,
                    w: '20%',
                    h: '10%',
                    fontSize: 14,
                    bold: true,
                    color: '2d2d2d'
                });

                // 添加内容
                slide.addText(item.content || '（无内容）', {
                    x: '25%',
                    y: `${yPos}%`,
                    w: '70%',
                    h: '10%',
                    fontSize: 12,
                    color: '2d2d2d',
                    breakLine: true
                });
            });
        }

        // 保存文件
        await pres.writeFile('分镜头脚本.pptx');
        
        // 更新步骤状态
        step3.classList.remove('active');
        step3.classList.add('completed');
        
        // 显示成功消息
        alert('PPT导出成功！');
    } catch (error) {
        console.error('导出PPT时出错:', error);
        alert('导出PPT时出错，请重试');
    }
} 