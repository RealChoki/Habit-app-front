<template>
  <div class="form-group">
    <input
      type="text"
      class="rounded-0 border-0 border-bottom w-100"
      id="discription-input"
      placeholder="Description (optional)"
    />
  </div>
</template>
  
<style scoped>
#discription-input {
  height: 29px;
  background: #131213;
  color: #ffffff;
  font-size: 12px;
}

#discription-input::placeholder {
  color: #c5c5c5;
  font-size: 12px;
  margin-left: 0px;
}

label {
  font-size: 10px;
}

input:focus {
  outline: none;
  box-shadow: none;
  background-color: #131213;
  color: #c5c5c5; 
  border-color: #ffffff;
}
</style>
