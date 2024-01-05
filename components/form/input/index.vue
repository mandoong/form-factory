<template>
  <table>
    <thead>
      <tr>
        <th v-for="(value, key, index) in schema[0]">
        {{ key }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(data, index) in schema">
        <td v-for="(value, key, index) in data">
          <span v-if="Array.isArray(value) && Object.keys(relation)?.some(e => e === key)">{{ relationCheck(value) }}</span>
          <span v-else-if="Array.isArray(value)">{{ relationCheck(value) }}</span>
          <span v-else-if="typeof value === 'object' && Object.keys(relation)?.some(e => e === key)">
            {{value?.id ?  relation[key] + ' ' +  value?.id : "-" }}</span>
          <span v-else>{{ value }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const $props = defineProps({
  schema: {
    type: Array
  },
  relation: {
    type: Object
  }
})

const {
  schema: schema,
  relation: relation,
} = toRefs($props)


const relationCheck = (value) => {
  if (value.id) {
    return value.id
  } else if (Array.isArray(value)) {
    return value.map(e => relationCheck(e))
  } else {
    return "-"
  }
}


const arr = [1, 2, 3]

const arrSlice = arr.splice(1, 1, ...arr)

console.log(arr, arrSlice)


onMounted(() => {
  console.log(schema.value)  
})

// 							schema={[
// 								{ label: "이메일", key: "email", method: "text", validation: "required", defaultValue: selected.email },
// 								{ label: "닉네임", key: "nickname", method: "text", validation: "required", defaultValue: selected.nickname },
// 								{ label: "이름", key: "name", method: "text", validation: "required", defaultValue: selected.name },
// 								// { label: "비밀번호", key: "password", method: "text", validation: "required", defaultValue: selected.password },
// 								{
// 									label: "생년월일",
// 									key: "birthday",
// 									method: "text",
// 									placeholder: "1990-01-01",
// 									validation: (v) => /\d\d\d\d-\d\d-\d\d/.test(v),
// 									defaultValue: selected.birthday,
// 								},
// 								{
// 									label: "성별",
// 									key: "gender",
// 									method: "select",
// 									selectOptions: [
// 										{ label: "남자", value: "Male" },
// 										{ label: "여자", value: "Female" },
// 									],
// 									defaultValue: { label: selected.gender, value: selected.gender },
// 								},
// 								{
// 									label: "전화번호",
// 									key: "phone",
// 									method: "text",
// 									validation: (v) => /\d\d\d-\d\d\d\d-\d\d\d\d/.test(v),
// 									placeholder: "010-1234-5678",
// 									defaultValue: selected.phone,
// 								},
// 								{
// 									label: "여행유형",
// 									key: "tripInfo",
// 									method: "select-multi",
// 									validation: "required",
// 									selectOptions: serviceConfig.tripTypes.map((v: string) => ({ label: v, value: v })),
// 									defaultValue: selected.tripInfo.map((v: string) => ({ label: v, value: v })),
// 								},
// 								{
// 									label: "기호",
// 									key: "info",
// 									method: "select-multi",
// 									validation: "required",
// 									selectOptions: [
// 										{ label: "가벼운 음주 좋아요", value: "가벼운 음주 좋아요" },
// 										{ label: "다양한 음식 시도", value: "다양한 음식 시도" },
// 										{ label: "무음주", value: "무음주" },
// 									],
// 									defaultValue: selected.info.map((v: string) => ({ label: v, value: v })),
// 								},
// 								{
// 									label: "MBTI",
// 									key: "mbti",
// 									method: "text",
// 									validation: "required",
// 									defaultValue: selected.mbti,
// 								},
// 								{
// 									label: "마케팅 동의",
// 									key: "marketingAgreement",
// 									method: "select",
// 									selectOptions: [
// 										{ label: "동의", value: true },
// 										{ label: "비동의", value: false },
// 									],
// 									defaultValue: selected.marketingAgreement ? { label: "동의", value: true } : { label: "비동의", value: false },
// 								},
// 							]}
// 							onSubmit={handleUpdate}
// 						/>
</script>

<style lang="scss" scoped>

table {
  width: 100%;

  .list_wrap {
  display: flex;

  .list {
    margin-left: 10px;
  }
}

}

</style>