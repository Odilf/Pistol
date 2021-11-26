<script>
	function handleKeydown(e) {
		if (e.shiftKey) {
			console.log(e.key);
			if (e.key === 'H' || e.key === 'T') { location.href = '/' }
			if (e.key === 'S') { location.href = '/settings' }
			if (e.key === 'D') { location.href = '/dashboard' }
			if (e.key === 'A') { location.href = '/about' }
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />