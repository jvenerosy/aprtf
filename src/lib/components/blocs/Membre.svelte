<script lang="ts">
	export let name: string;
	export let lastname: string;
	export let description: string;
	export let date: string;
	export let photo: string;
	export let type: string;

	import { PUBLIC_HOST_API } from '$env/static/public';
	import {slugify} from '$lib/utils/slugify';

    const slugName = slugify(name);
</script>

<div class="box is-{type} is-fullheight">
	<div class="columns is-vcentered">
		<div class="column is-4">
			<div
				class="rounded"
				style={`background-image: url(${PUBLIC_HOST_API}/assets/${photo}/${slugName}?width=150&height=150&format=webp);`}
				title={name}
			/>
			<p class="name">{name} {lastname}</p>
			{#if date}
				<p class="date">{date}</p>
			{/if}
		</div>
		<div class="column">
			<p class="description">{description}</p>
		</div>
	</div>
</div>

<style lang="scss">
	@import '../../../styles/variables.scss';

	.box {
		border-top: 9px solid #000;
		font-family: $family-regular;

		&.is-fondateur {
			border-color: $primary;
		}
		&.is-associe {
			border-color: $tertiary;
		}
		&.is-formateur {
			border-color: $family;
		}

		.rounded {
			border-radius: 50%;
			width: 92px;
			height: 92px;
			margin: 0 auto;
			background-size: cover;
		}

		.name {
			font-size: $size-large;
			font-weight: 600;
			line-height: 1em;
			margin-top: $gap;
		}

		.date {
			font-size: $size-regular;
		}

		.description {
			text-align: left;
		}

		&.is-fullheight {
			height: 100%;
		}
	}
</style>
