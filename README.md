# 漫画分镜头脚本生成器

这是一个基于H5+JS开发的Web应用，可以将用户输入的故事转换为专业的漫画分镜头脚本，并支持导出为PPT格式。

## 功能特点

- API密钥验证系统
- 故事文本输入
- 调用Deepseek API生成专业分镜头脚本
- 实时显示生成结果
- 支持导出为PPT格式
- 现代简约的界面设计

## 使用方法

1. 克隆本项目到本地
2. 使用Web服务器（如Live Server）打开login.html
3. 输入您的Deepseek API密钥并验证
4. 验证成功后将自动进入主页面
5. 在文本框中输入您的故事
6. 点击"生成分镜头脚本"按钮
7. 等待生成结果
8. 点击"导出为PPT"按钮将结果保存为PPT文件

## 技术栈

- HTML5
- CSS3
- JavaScript (ES6+)
- pptxgenjs (用于生成PPT)
- Deepseek API
- LocalStorage (用于存储API密钥)

## 注意事项

- 使用前请确保已获取Deepseek API密钥
- API密钥将安全存储在浏览器的LocalStorage中
- 确保有稳定的网络连接
- 建议使用现代浏览器（Chrome、Firefox、Edge等）访问

## 安全说明

- API密钥仅存储在用户本地，不会上传到服务器
- 可以随时通过点击"退出登录"按钮清除存储的API密钥
- 建议定期更换API密钥以确保安全

## 开发者说明

如需修改API调用逻辑，请查看：
- `login.js` - API密钥验证逻辑
- `script.js` - 主要业务逻辑和API调用
如需自定义PPT导出格式，请修改`script.js`中的`exportToPPT`函数。 