<template>
    <div>
        this is test,{{name}}
        <slot></slot>
    </div>
</template>


<script>
export default {
    props: [ 'name' ]
}
</script>

