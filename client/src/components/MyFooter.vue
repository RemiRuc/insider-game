<template>
    <div class="footer-ctn">
        <div class="footer-anim" :class="{'open': open}">
            <p class="open-close-btn" @click="open = !open">{{ open ? $t('footer.fermer') : $t('footer.options')}}</p>
            <footer>
                <p>{{$t("footer.developpePar")}} <a href="https://remiruc.fr" target="_blank">{{$t("footer.remiRucojevic")}}</a></p>
                <p class="rs"><a href="https://twitter.com/RemiRuc" target="_blank">{{$t("footer.twitter")}}</a> | <a href="https://www.instagram.com/remiruc" target="_blank">{{$t("footer.insta")}}</a></p>
                <LocalSwitcher/>
            </footer>
        </div>
    </div>
</template>

<script>
import LocalSwitcher from './LocalSwitcher'

export default {
    data() {
        return {
            open: false
        }
    },
    components: {LocalSwitcher}
}
</script>

<style lang="scss" scoped>
    .open-close-btn {
        cursor: pointer;
    }
    .footer-ctn {
        width: 100%;
        overflow: hidden;

        .footer-anim {
            width: 100%;

            transform: translateY(45px);

            transition: .3s;

            &.open {
                transform: translateY(0px);
            }
        }
    }

    footer {
        position: relative;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 50px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        background-color: #0f0f0f;

        border-top: grey solid 1px;

        font-size: 0.8rem;

        p {
            margin: 2px 0;
        }

        .rs {
            a {
                margin: 0 10px;
            }
        }
    }
</style>