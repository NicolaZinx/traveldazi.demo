// script.js

// 调试：在脚本最顶部添加一个 alert，看它是否能弹出
// 如果这个 alert 弹不出来，说明 script.js 根本没有被浏览器加载或执行
// 在您确认一切正常后，请将这行代码删除或注释掉
// alert("Hello from script.js!"); // 这行现在可以被注释掉或删除，因为它完成了调试任务


document.addEventListener('DOMContentLoaded', () => {
    // 调试：当 DOM 内容加载完成时，在控制台打印一条消息
    console.log("DOM content loaded. JavaScript script is running.");

    // --- DOM 元素获取 ---
    const loginPage = document.getElementById('loginPage');
    const registerPage = document.getElementById('registerPage');
    const mainApp = document.getElementById('mainApp');

    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const switchToRegisterBtn = document.getElementById('switchToRegister');
    const switchToLoginBtn = document.getElementById('switchToLogin');
    const logoutBtn = document.getElementById('logoutBtn');

    const navLinks = document.querySelectorAll('.nav-link');
    const contentPages = document.querySelectorAll('.content-page');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    const profileTabButtons = document.querySelectorAll('.profile-tabs .tab-btn');
    const profileTabContents = document.querySelectorAll('.profile-tabs .tab-content');

    const publishModal = document.getElementById('publishModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalCloseBtn = document.querySelector('.modal-close');
    const publishDabberBtn = document.getElementById('publishDabberBtn');
    const publishTravelBtn = document.getElementById('publishTravelBtn');
    const cancelPublishBtn = document.getElementById('cancelPublish');
    const publishForm = document.getElementById('publishForm');
    const dabberFormFields = document.getElementById('dabberFormFields');
    const travelFormFields = document.getElementById('travelFormFields');
    const publishTypeInput = document.getElementById('publishType'); // 隐藏字段，记录当前发布类型


    // --- 页面切换函数 ---
    function showPage(pageId) {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        } else {
            console.error(`错误：找不到ID为 ${pageId} 的页面元素。`);
            return;
        }

        // 如果是登录或注册页面，隐藏主应用导航
        if (pageId === 'loginPage' || pageId === 'registerPage') {
            document.querySelector('body').style.overflow = 'hidden'; // 防止滚动条
            if (navMenu && navMenu.classList.contains('active')) { // 关闭移动端菜单
                navMenu.classList.remove('active');
                if (navToggle) navToggle.classList.remove('open');
            }
        } else {
            document.querySelector('body').style.overflow = 'auto'; // 恢复滚动条
        }
    }

    // 主应用内容区切换函数
    function showContentPage(pageId) {
        contentPages.forEach(page => {
            page.classList.remove('active');
        });
        const targetContentPage = document.getElementById(pageId);
        if (targetContentPage) {
            targetContentPage.classList.add('active');
        } else {
            console.error(`错误：找不到ID为 ${pageId} 的内容页面元素。`);
            return;
        }


        navLinks.forEach(link => {
            link.classList.remove('active');
            // 注意：这里需要根据 data-page 属性来匹配 content-page 的 id
            // content-page 的 id 是 "homePage", "dabberPage" 等
            // nav-link 的 data-page 是 "home", "dabber" 等
            if (link.dataset.page && link.dataset.page === pageId.replace('Page', '')) { 
                link.classList.add('active');
            }
        });

        // 关闭移动端导航菜单
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('open');
        }
    }

    // --- 初始页面加载 ---
    showPage('loginPage'); // 默认显示登录页面


    // --- 认证页面交互 ---
    if (switchToRegisterBtn) {
        switchToRegisterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showPage('registerPage');
        });
    }

    if (switchToLoginBtn) {
        switchToLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showPage('loginPage');
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // 阻止表单默认提交行为（页面刷新）
            // 确保这些ID在HTML中是正确的，否则会获取不到元素
            const loginEmailInput = document.getElementById('loginEmail');
            const loginPasswordInput = document.getElementById('loginPassword');

            if (!loginEmailInput || !loginPasswordInput) {
                console.error("错误：找不到登录邮箱或密码输入框的DOM元素。请检查HTML ID是否正确。");
                alert("登录功能暂时不可用，请联系管理员。");
                return;
            }

            const email = loginEmailInput.value; // 获取用户名/邮箱输入框的值
            const password = loginPasswordInput.value; // 获取密码输入框的值

            // 简单的模拟登录验证
            // 这里我们假设只要输入框有值就“登录成功”
            if (email && password) {
                console.log('登录成功！正在跳转到主页...'); // 可以在控制台查看提示
                showPage('mainApp'); // 显示主应用页面
                showContentPage('homePage'); // 登录后默认进入主页的“首页”内容
            } else {
                alert('请输入用户名/邮箱和密码。'); // 提示用户输入信息
            }
        });
    }


    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const registerUsernameInput = document.getElementById('registerUsername');
            const registerEmailInput = document.getElementById('registerEmail');
            const registerPasswordInput = document.getElementById('registerPassword');
            const confirmPasswordInput = document.getElementById('confirmPassword');

            if (!registerUsernameInput || !registerEmailInput || !registerPasswordInput || !confirmPasswordInput) {
                console.error("错误：找不到注册表单的DOM元素。请检查HTML ID是否正确。");
                alert("注册功能暂时不可用，请联系管理员。");
                return;
            }

            const username = registerUsernameInput.value;
            const email = registerEmailInput.value;
            const password = registerPasswordInput.value;
            const confirmPass = confirmPasswordInput.value;

            if (password !== confirmPass) {
                alert('两次输入的密码不一致！');
                return;
            }

            // 简单的模拟注册
            if (username && email && password) {
                alert('注册成功！请登录。');
                showPage('loginPage'); // 注册成功后返回登录页面
            } else {
                alert('请填写所有必填项。');
            }
        });
    }


    // --- 主应用导航 ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageName = link.dataset.page; // 'home', 'dabber', 'travel', 'profile'
            if (pageName === 'logout') {
                alert('您已退出登录。');
                showPage('loginPage');
            } else {
                showContentPage(`${pageName}Page`); // 拼接成 'homePage'
            }
        });
    });

    // 移动端导航切换
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('open');
        });
    }

    // 首页英雄区按钮点击
    document.querySelectorAll('.hero-actions .btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const pageName = button.dataset.page;
            showContentPage(`${pageName}Page`);
        });
    });


    // --- 个人中心 Tabs ---
    profileTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab; // 'posts', 'dabbers', 'trips', 'settings'

            // 移除所有按钮的 active 类
            profileTabButtons.forEach(btn => btn.classList.remove('active'));
            // 添加当前点击按钮的 active 类
            button.classList.add('active');

            // 隐藏所有 Tab 内容
            profileTabContents.forEach(content => content.classList.remove('active'));
            // 显示对应 Tab 内容
            const targetTabContent = document.getElementById(`${tabId}Tab`);
            if (targetTabContent) {
                targetTabContent.classList.add('active');
            } else {
                console.error(`错误：找不到ID为 ${tabId}Tab 的个人中心Tab内容。`);
            }
        });
    });

    // --- 模态框功能 ---
    function openPublishModal(type) {
        if (!publishModal || !modalTitle || !dabberFormFields || !travelFormFields || !publishTypeInput) {
            console.error("模态框或其内部元素未找到，无法打开发布模态框。");
            return;
        }
        publishModal.style.display = 'flex';
        // 根据类型设置模态框标题和显示对应表单
        if (type === 'dabber') {
            modalTitle.textContent = '发布搭子需求';
            dabberFormFields.classList.add('active-form-section');
            travelFormFields.classList.remove('active-form-section');
            publishTypeInput.value = 'dabber';
        } else if (type === 'travel') {
            modalTitle.textContent = '发布旅行计划';
            travelFormFields.classList.add('active-form-section');
            dabberFormFields.classList.remove('active-form-section');
            publishTypeInput.value = 'travel';
        }
    }

    function closePublishModal() {
        if (!publishModal || !publishForm) {
            console.error("模态框或其表单未找到，无法关闭发布模态框。");
            return;
        }
        publishModal.style.display = 'none';
        publishForm.reset(); // 清空表单
    }

    // 绑定打开模态框的按钮
    if (publishDabberBtn) {
        publishDabberBtn.addEventListener('click', () => openPublishModal('dabber'));
    }
    if (publishTravelBtn) {
        publishTravelBtn.addEventListener('click', () => openPublishModal('travel'));
    }

    // 绑定关闭模态框的按钮
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closePublishModal);
    }
    if (cancelPublishBtn) {
        cancelPublishBtn.addEventListener('click', closePublishModal);
    }


    // 点击模态框外部关闭
    if (publishModal) {
        window.addEventListener('click', (event) => {
            if (event.target === publishModal) {
                closePublishModal();
            }
        });
    }

    // 模态框表单提交 (模拟)
    if (publishForm) {
        publishForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const publishType = publishTypeInput.value;
            let title = '';
            if (publishType === 'dabber') {
                const dabberTitleInput = document.getElementById('dabberTitle');
                title = dabberTitleInput ? dabberTitleInput.value : '';
            } else if (publishType === 'travel') {
                const travelTitleInput = document.getElementById('travelTitle');
                title = travelTitleInput ? travelTitleInput.value : '';
            }

            if (title) {
                alert(`已成功发布您的${publishType === 'dabber' ? '搭子需求' : '旅行计划'}："${title}"！`);
                closePublishModal();
            } else {
                alert('请填写标题。');
            }
        });
    }


    // --- 其他模拟交互 ---
    const uploadAvatarBtn = document.getElementById('uploadAvatarBtn');
    if (uploadAvatarBtn) {
        uploadAvatarBtn.addEventListener('click', () => {
            alert('模拟：图片上传功能（需要后端支持）');
            // 实际中这里会触发文件选择器
        });
    }

    const addImageBtn = document.getElementById('addImageBtn');
    if (addImageBtn) {
        addImageBtn.addEventListener('click', () => {
            alert('模拟：添加图片到动态（需要后端支持）');
        });
    }

    // 阻止 contenteditable 元素的回车键默认行为 (防止创建新行)
    const userBioElement = document.querySelector('.user-bio');
    if (userBioElement) {
        userBioElement.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                this.blur(); // 失去焦点，模拟保存
                alert('模拟：个人简介已更新');
            }
        });
    }
});