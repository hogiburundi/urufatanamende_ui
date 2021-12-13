<template>
<div class="magasin">
	<h2>Notifications</h2>
	<table>
		<thead>
			<tr>
				<th>username</th>
				<th>nom</th>
				<th>prenom</th>
				<th>telephone</th>
				<th>Role</th>
				<th>option</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="i in 3">
				<td>inganzamarumpu</td>
				<td>NKURUNZIZA</td>
				<td>Jonathan</td>
				<td>75 96 06 96</td>
				<td>Vendeur</td>
				<td>
					<button>modifier</button>
					<button>supprimer</button>
				</td>
			</tr>
		</tbody>
	</table>
</div>
</template>
<script>
export default{

};
</script>
<style scoped>
.magasin{
	margin: 20px;
}
form{
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: flex-end;
}
.field, form button{
	margin: 5px;
}
.field *{
	display: block;
}
table{
	width: 100%;
}
</style>