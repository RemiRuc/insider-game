<template>
    <footer>
        <p>Developed by <a href="https://remiruc.fr" target="_blank">Rémi Rucojevic</a></p>
        <p><a href="https://remiruc.fr" target="_blank">Twitter</a> | <a href="https://remiruc.fr" target="_blank">Instagram</a></p>
    </footer>
</template>

<style lang="scss" scoped>
    footer {
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
    }
</style>