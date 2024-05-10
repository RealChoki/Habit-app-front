<template>
    <div class="back-next">
        <RouterLink class="back" to="/">BACK</RouterLink>
        <img alt="ellipsis" />
        <RouterLink class="next" to="/">NEXT</RouterLink>
    </div>
</template>

<style scoped>
    .back {
        text-decoration: none;
        color: #5B5B5B;
        font-weight: bold;
        font-size:12px;
    }

    .next {
        text-decoration: none;
        color: #FEFFF7;
        font-weight: bold;
        font-size:12px;
    }

    .back-next {
        position: absolute;
        bottom: 50px;
        left: 0;
        right: 0;
        display: flex;
        gap: 67px;
        justify-content: center;
    }
</style>