/**
 * @name HideSideBar
 * @version 1.1.0
 * @description Plugin to hide sidebar in discord
 * @author Pieloaf
 * @authorId 439364864763363363
 * @website https://pieloaf.github.io
 * @source https://github.com/Pieloaf/BetterDiscordPlugins/blob/main/HideSidebar.plugin.js
 * @updateUrl https://raw.githubusercontent.com/Pieloaf/BetterDiscordPlugins/main/HideSidebar.plugin.js
 */
module.exports = (_ => {

    function createSelector(className) {
        return '.' + className.replace(/ /g, '.')
    }

    const sidebarSelector = createSelector(BdApi.findModuleByProps("hasNotice").sidebar)
    const guildBarSelector = createSelector(BdApi.findModuleByProps("hasNotice").guilds)
    const sidebarBtn = document.createElement('span');
    const btnStyle = `
            .hide-sidebar-btn {
                color: var(--interactive-normal);
                background-color: var(--background-primary);
                transition: background-color .15s ease-out,color .15s ease-out, border-radius .15s ease-out;
                display: flex; 
                justify-content: center;
                margin: 6px 10px;
                padding: 5px 3px;
                border-radius: 15px;
                font-weight: 500;
            }
            .hide-sidebar-btn:hover{
                border-radius: 7px;
                cursor: pointer;
                color: #fff;
                background-color: var(--brand-experiment);
            }`;

    return class {

        start() {
            BdApi.injectCSS('HideSidebarStyles', btnStyle)
            this.initialise()
        }
        stop() {
            BdApi.clearCSS('HideSidebarStyles')
            this.cleanup()
        }

        cleanup() {
            sidebarBtn.remove()
        }

        createButton() {
            const sidebar = document.querySelector(sidebarSelector)

            sidebarBtn.innerHTML = '<<<'
            sidebarBtn.classList.add('hide-sidebar-btn')
            sidebarBtn.addEventListener('click', function () {
                if (sidebar.style.display === "" || sidebar.style.display === "flex") {
                    sidebar.style.display = "none"
                    sidebarBtn.innerHTML = '>>>'
                }
                else {
                    sidebar.style.display = "flex"
                    sidebarBtn.innerHTML = '<<<'
                }
            })
            return sidebarBtn
        }

        observer(mutationRecord) {
            const serverList = document.querySelector(guildBarSelector).firstChild.childNodes[1]
            const serverListSelector = createSelector(serverList.classList.value)
            if (mutationRecord.type !== 'childList') return;
            if (!mutationRecord.addedNodes.length) return;
            for (const node of Array.from(mutationRecord.addedNodes)) {
                if (node.matches && node.matches(serverListSelector)) {
                    this.initialise(node);
                    return;
                } else if (node.querySelector) {
                    const child = node.querySelector(serverListSelector);
                    if (child) {
                        this.initialise(child);
                        return;
                    }
                }
            }
        }

        initialise(serverListNode) {
            this.createButton()
            let serverList = serverListNode || document.querySelector(guildBarSelector).firstChild.childNodes[1]
            serverList.insertBefore(sidebarBtn, serverList.firstElementChild.nextSibling);
        }
    }
})();