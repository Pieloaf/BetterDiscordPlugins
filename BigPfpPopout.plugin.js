/**
 * @name BigPfpPopout
 * @version 1.0.0
 * @description Displays 256x256 pfp on user popouts
 * @author Pieloaf
 * @authorId 439364864763363363
 * @website https://pieloaf.github.io
 * @source https://github.com/Pieloaf/BetterDiscordPlugins/blob/main/BigPfpPopout.plugin.js
 * @updateUrl https://raw.githubusercontent.com/Pieloaf/BetterDiscordPlugins/main/BigPfpPopout.plugin.js
 */
module.exports = (_ => {
    return (class {
        start() {
            let profileStyle = document.createElement('style');
            profileStyle.id = 'profileStyle'
            profileStyle.innerHTML = `
            /* setting width of whole pop out */
            .userPopout-3XzG_A{
                width: 256px !important;
            }

            /* Moving avatar to top left corner of popout */
            .avatarWrapper-1-5NA0
            {
                left: 0 !important;
                top: 0 !important;
                background-color: var(--background-floating);
            }

            /* making the pfp big */
            .avatar-22FtUu.wrapper-3t9DeA{
                border: none;
                width: 256px !important;
                height: 256px !important;
                bottom: 0
            }
            /* removing the mask so its a sqaure instead of a circle */
            .avatar-22FtUu.wrapper-3t9DeA>
            .mask-1l8v16.svg-2V3M55 > foreignObject{
                mask: none;
                border-radius: 1px 1px 0px 0px!important;
            }

            /* adjusting the shape and size of the online status indicator */
            .avatar-22FtUu.wrapper-3t9DeA>
            .mask-1l8v16.svg-2V3M55 > rect{
                mask:none;
                width: 80px;
                height: 2px;
                y: 78px;
                x: 0px
            }

            /* moving the "View Profile overlay to top left and making it big */
            .avatarHint-1E3LMl{
                top:0;
                left:0;
                height: 256px !important;
                width: 256px !important;
                border-radius: 7px;
            }

            /* removing the circle mask form "view profile" overlay */
            /* and reducing the height for the online indicator */
            .avatarHint-1E3LMl > foreignObject{
                height: 78px;
                mask:none;
            }

            /* smaller, skinnier font for "View Profile" text */
            .avatarHintInner-2kMTo4{
                font-weight: 200;
            }
            /* Nitro and House Badges */
            .profileBadges-3cJaE1{
                position: relative !important;
                justify-content: flex-start;
                left: 0;
                right: auto;
            }
            .container-q03LZO{
                margin-bottom: 16px !important;
            }

            .banner-2QYc2d{
                width: 256px !important;
                z-index: -1;
            }
            .headerTop-2cWpdB{
                padding-top: 192px
            }`;
            document.getElementsByTagName('head')[0].appendChild(profileStyle);
        }
        stop() {
            let profileStyle = document.getElementById('profileStyle')
            profileStyle.remove()
        }
    })
})();