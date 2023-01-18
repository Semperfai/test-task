<template >
	<div>
		<p>Select your position</p>
		<div class="options">
			<div class="options__item">
				<input class="options__input" type="radio" id="positionChoice1" name="position" value="Frontend developer"
					checked>
				<label class="options__label" for="positionChoice1">Frontend developer</label>
			</div>
			<div class="options__item">
				<input class="options__input" type="radio" id="positionChoice2" name="position" value="Backend developer">
				<label class="options__label" for="positionChoice2">Backend developer</label>
			</div>
			<div class="options__item">
				<input class="options__input" type="radio" id="positionChoice3" name="position" value="Designer">
				<label class="options__label" for="positionChoice3">Designer</label>
			</div>
			<div class="options__item">
				<input class="options__input" type="radio" id="positionChoice4" name="position" value="QA">
				<label class="options__label" for="positionChoice4">QA</label>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'test-radio-btn'




}
</script>
<style lang="scss">

</style>