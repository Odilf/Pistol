<script lang='ts'>
	import { Button, Dialog, Card, CardText, CardActions, CardTitle } from 'svelte-materialify'
	import { createEventDispatcher } from "svelte";

	export let button_text: string
	export let dialog_text: string

	const dispatch = createEventDispatcher();

	function confirm() {
		dispatch('confirmation');
		close()
	}

	let active = false

	function open() { active = true }
	function close() { active = false }
</script>

<Button on:click={open}>{button_text}</Button>

<Dialog bind:active>
	<Card>
	  <CardTitle>Are you sure?</CardTitle>
	  <CardText>
		  {dialog_text}
	  </CardText>
	  <CardActions>
		<Button on:click={close} text class='blue-text'>Cancel</Button>
		<Button on:click={confirm} text class="red-text">{button_text}</Button>
	  </CardActions>
	</Card>
  </Dialog>