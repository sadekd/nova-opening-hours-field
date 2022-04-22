<template>
    <td class="px-2 py-2 border-t border-gray-100 dark:border-gray-700 dark:bg-gray-800 group-hover:bg-gray-50 dark:group-hover:bg-gray-900">
        <slot />
    </td>
</template>

<script>
export default {
    name: "TableColumn"
}
</script>
