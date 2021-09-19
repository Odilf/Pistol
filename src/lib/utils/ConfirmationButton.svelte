<script lang='ts'>
	import { Button, Dialog, Card, CardText, CardActions, CardTitle } from 'svelte-materialify'
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	function confirm() {
		dispatch('confirmation');
		close()
	}

	let active = false

	function open() { active = true }
	function close() { active = false }
</script>

<Button on:click={open} class='red darken-4'>
	<slot/>
	
</Button>

<Dialog bind:active>
	<Card>
	  <CardTitle>Are you sure?</CardTitle>

	  <CardText>
		<slot name='dialog'/>
	  </CardText>

	  <CardActions>
		<Button on:click={close} text class='blue-text'>Cancel</Button>
		<Button on:click={confirm} text class="red-text"><slot/></Button>
	  </CardActions>
	</Card>
  </Dialog>