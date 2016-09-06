// NOTES:
// GIFs smoothly animate
// Get attack damage to be random
// Sigma uses both attacks randomly

$(document).ready(function() {

	//Initial Start Button//
	$('#start_button').one('click', function() {
		$('#start_button').fadeToggle(100);
		$('#game_div').fadeToggle(1000).css('display', 'flex');
		$('#x_name').append(megaMan.x.name);
		$('#x_hp').append(megaMan.x.hp);
		$('#sigma_name').append(megaMan.sigma.name);
		$('#sigma_hp').append(megaMan.sigma.hp);
		$('#x_atk1_count').append(megaMan.x.atk_1.count + '/50');
		$('#x_atk2_count').append(megaMan.x.atk_2.count + '/12');
		$('#x_atk3_count').append(megaMan.x.atk_3.count + '/4');
		megaMan.x_attack1();
		megaMan.x_attack2();
		megaMan.x_attack3();
	});

	//GAME OBJECT//
	var megaMan = {

		x: {
					name:  'X',
					hp:    15000,
					atk_1: {
									name: 'X-Buster',
									dmg:   Math.floor(Math.random() * (999 - 600 + 1) + 600),
									count: 50
								 },
					atk_2: {
									name: 'Charged Shot',
									dmg:   Math.floor(Math.random() * (1500 - 1000 + 1) + 1000),
									count: 12
								 },
					atk_3: {
									name: 'Giga Attack',
									dmg:   Math.floor(Math.random() * (3300 - 2300 + 1) + 2300),
									count: 4
								 },
					low:   'It\'s time to get serious!',
					dead:  false
				},

		sigma: {
							name:  'Sigma',
							hp:    30000,
							atk_1: {
											name: 'Plasma Canon',
											dmg:   Math.floor(Math.random() * (1100 - 250 + 1) + 250)
										 },
							atk_2: {
											name: 'Energy Saber',
											dmg:   Math.floor(Math.random() * (1700 - 1200 + 1) + 1200)
										 },
							low:   'Damn you, X!',
							dead:  false
						},

		x_attack1: function() {
			$('#x_atk1_button').on('click', function() {
				console.log('Sigma HP:' + megaMan.sigma.hp);
				var xLastAttack = megaMan.x.atk_1.dmg;

				//HP is updated
				document.getElementById('sigma_hp').innerHTML = (megaMan.sigma.hp -= megaMan.x.atk_1.dmg);

				//count is updated
				document.getElementById('x_atk1_count').innerHTML = ((megaMan.x.atk_1.count -= 1) + '/50');

				//flash red
				$('#sigma_hp').addClass('flash_red');
				setTimeout(function() {
					$('#sigma_hp').removeClass('flash_red');
				}, 250);

				//flash move and damage
				document.getElementById('x_notice').innerHTML = megaMan.x.atk_1.name + '<br>' + xLastAttack;
					setTimeout(function() {
						document.getElementById('x_notice').innerHTML = '';
					}, 500);

				//check win
				megaMan.checkWin();

				//prevent number below 0
				if(!megaMan.sigma.dead){
					setTimeout(function() {
						megaMan.sigma_attack();
					}, 1000);
				};

				//check count
				megaMan.checkAtk1();

			});
		},

		x_attack2: function() {
			$('#x_atk2_button').on('click', function() {
				console.log('Sigma HP:' + megaMan.sigma.hp);
				var xLastAttack = megaMan.x.atk_2.dmg;

				//HP is updated
				document.getElementById('sigma_hp').innerHTML = (megaMan.sigma.hp -= megaMan.x.atk_2.dmg);

				//count is updated
				document.getElementById('x_atk2_count').innerHTML = ((megaMan.x.atk_2.count -= 1) + '/12');

				//flash red
				$('#sigma_hp').addClass('flash_red');
				setTimeout(function() {
					$('#sigma_hp').removeClass('flash_red');
				}, 250);

				//flash move and damage
				document.getElementById('x_notice').innerHTML = megaMan.x.atk_2.name + '<br>' + xLastAttack;
					setTimeout(function() {
						document.getElementById('x_notice').innerHTML = '';
					}, 500);

				//check win
				megaMan.checkWin();

				//prevent number below 0
				if(!megaMan.sigma.dead){
					setTimeout(function() {
						megaMan.sigma_attack();
					}, 1000);
				};

				//check count
				megaMan.checkAtk2();

			});
		},

		x_attack3: function() {
			$('#x_atk3_button').on('click', function() {
				console.log('Sigma HP:' + megaMan.sigma.hp);
				var xLastAttack = megaMan.x.atk_3.dmg;

				//HP is updated
				document.getElementById('sigma_hp').innerHTML = (megaMan.sigma.hp -= megaMan.x.atk_3.dmg);

				//count is updated
				document.getElementById('x_atk3_count').innerHTML = ((megaMan.x.atk_3.count -= 1) + '/4');

				//flash red
				$('#sigma_hp').addClass('flash_red');
				setTimeout(function() {
					$('#sigma_hp').removeClass('flash_red');
				}, 250);

				//flash move and damage
				document.getElementById('x_notice').innerHTML = megaMan.x.atk_3.name + '<br>' + xLastAttack;
					setTimeout(function() {
						document.getElementById('x_notice').innerHTML = '';
					}, 500);

				//check win
				megaMan.checkWin();

				//prevent number below 0
				if(!megaMan.sigma.dead){
					setTimeout(function() {
						megaMan.sigma_attack();
					}, 1000);
				};

				//check count
				megaMan.checkAtk3();

			});
		},

		sigma_attack: function() {
			console.log('X HP:' + megaMan.x.hp)
			var sigmaLastAttack = megaMan.sigma.atk_1.dmg;

			//attack X
			document.getElementById('x_hp').innerHTML = (megaMan.x.hp -= sigmaLastAttack);

			//change x gif while attacked
			document.getElementById('x_gif_div').innerHTML = '<img id="x_gif2" src="img/x-hurt.gif"/>';
			setTimeout(function() {
				document.getElementById('x_gif_div').innerHTML = '<img id="x_gif" src="img/x.gif"/>';
			}, 250);

			//flash red
			$('#x_hp').addClass('flash_red');
				setTimeout(function() {
					$('#x_hp').removeClass('flash_red');
				}, 250);

			//flash move and damage
			document.getElementById('sigma_notice').innerHTML = megaMan.sigma.atk_1.name + '<br>' + sigmaLastAttack;
				setTimeout(function() {
					document.getElementById('sigma_notice').innerHTML = '';
				}, 500);

			//check X health
			setTimeout(function(){
				megaMan.checkXHealth();
			}, 251);

			//check Sigma health
			megaMan.checkSigmaHealth();

			//check win
			setTimeout(function(){
				megaMan.checkWinSigma();
			}, 251);
		},

		checkWin: function() {
			if(megaMan.sigma.hp <= 0){
				megaMan.sigma.dead = true;
				document.getElementById('sigma_hp').innerHTML = 0;
				alert('X WINS!');
				setTimeout(function() {
					window.location.reload();
				}, 5000);
			};

		},

		checkXHealth: function() {
			if(megaMan.x.hp <= 1200) {
				document.getElementById('x_notice2').innerHTML = megaMan.x.low;
				document.getElementById('x_gif_div').innerHTML = '<img id="x_gif2" src="img/x-low.gif"/>';
			}
		},

		checkWinSigma: function() {
			if(megaMan.x.hp <= 0){
				megaMan.x.dead = true;
				document.getElementById('x_hp').innerHTML = 0;
				document.getElementById('x_gif_div').innerHTML = '<img id="x_gif_reverse" src="img/x-dead.gif"/>';
				alert('SIGMA WINS!');
				setTimeout(function() {
					window.location.reload();
				}, 5000);
			};

		},

		checkSigmaHealth: function() {
			if(megaMan.sigma.hp <= 4000) {
				setTimeout(function() {
					document.getElementById('sigma_notice2').innerHTML = megaMan.sigma.low;
				}, 1000);
			};
		},

		checkAtk1: function() {
			if(megaMan.x.atk_1.count <= 0) {
				document.getElementById('x_atk1_button').disabled = true;
			}
		},

		checkAtk2: function() {
			if(megaMan.x.atk_2.count <= 0) {
				document.getElementById('x_atk2_button').disabled = true;
			}
		},

		checkAtk3: function() {
			if(megaMan.x.atk_3.count <= 0) {
				console.log('if works')
				document.getElementById('x_atk3_button').disabled = true;
			}
		}

	};

});
