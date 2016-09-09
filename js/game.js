// TO DOs:
// Better UI design
// GIFs smoothly animate
// GIFs for Sigma
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
									dmg:   function() { 
										return Math.floor(Math.random() * (999 - 600 + 1) + 600);
									},
									count: 50
								 },
					atk_2: {
									name: 'Charged Shot',
									dmg:   function() {
										return Math.floor(Math.random() * (1500 - 1000 + 1) + 1000);
									},
									count: 12
								 },
					atk_3: {
									name: 'Giga Attack',
									dmg:   function() {
										return Math.floor(Math.random() * (3300 - 2300 + 1) + 2300);
									},
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
											dmg:   function() {
												return Math.floor(Math.random() * (900 - 250 + 1) + 250);
											}
										 },
							atk_2: {
											name: 'Energy Saber',
											dmg:   function() {
												return Math.floor(Math.random() * (2000 - 1100 + 1) + 1200);
											}
										 },
							low:   'Damn you, X!',
							dead:  false
						},

		randomAttack: function() {
			var random = Math.floor(Math.random() * (3 - 0 + 1) + 0);
			random;

			if(random === 0) {
				return megaMan.sigma.atk_2.dmg();
			} else {
				return megaMan.sigma.atk_1.dmg();
			}
		},

		x_attack1: function() {
			$('#x_atk1_button').on('click', function() {

				var xLastAttack = megaMan.x.atk_1.dmg();

				//HP is updated, flash move and damage
				megaMan.sigmaHPUpdate(xLastAttack);

				//count is updated
				megaMan.xAttack1Count();

				//flash text red
				megaMan.sigmaFlashRedText();

				//sigma bg flash
				megaMan.sigmaFlashRed();

				//check win
				megaMan.checkWin();

				//prevent number below 0
				megaMan.sigmaDeadNumber();

				//check count
				megaMan.checkAtk1();

			});
		},

		x_attack2: function() {
			$('#x_atk2_button').on('click', function() {

				var xLastAttack = megaMan.x.atk_2.dmg();

				//HP is updated, flash move and damage
				megaMan.sigmaHPUpdate(xLastAttack);

				//count is updated
				megaMan.xAttack2Count();

				//flash text red
				megaMan.sigmaFlashRedText();

				//sigma bg flash
				megaMan.sigmaFlashRed();

				//check win
				megaMan.checkWin();

				//prevent number below 0
				megaMan.sigmaDeadNumber();

				//check count
				megaMan.checkAtk2();

			});
		},

		x_attack3: function() {
			$('#x_atk3_button').on('click', function() {

				var xLastAttack = megaMan.x.atk_3.dmg();

				//HP is updated, flash move and damage
				megaMan.sigmaHPUpdate(xLastAttack);

				//count is updated
				megaMan.xAttack3Count();

				//flash text red
				megaMan.sigmaFlashRedText();

				//sigma bg flash
				megaMan.sigmaFlashRed();

				//check win
				megaMan.checkWin();

				//prevent number below 0
				megaMan.sigmaDeadNumber();

				//check count
				megaMan.checkAtk3();

			});
		},

		sigma_attack: function() {
			var sigmaLastAttack = megaMan.randomAttack();

			//attack X, flash move and damage
			megaMan.xHPUpdate(sigmaLastAttack);

			//change x gif while attacked
			megaMan.xGifAttacked();

			//flash red
			megaMan.xFlashRed();

			//flash X bg red
			megaMan.xFlashRedBg();

			//check X health
			megaMan.checkXHealth();

			//check Sigma health
			megaMan.checkSigmaHealth();

			//check win
			megaMan.checkWinSigma();
		},

		sigmaHPUpdate: function(attack) {
			console.log(attack);

			document.getElementById('sigma_hp').innerHTML = (megaMan.sigma.hp -= attack);

			if(attack >= 2200){
				document.getElementById('x_notice').innerHTML = megaMan.x.atk_3.name + '<br>' + attack;
				setTimeout(function() {
					document.getElementById('x_notice').innerHTML = '';
				}, 500);
			} else if(attack <= 999) {
				document.getElementById('x_notice').innerHTML = megaMan.x.atk_1.name + '<br>' + attack;
				setTimeout(function() {
					document.getElementById('x_notice').innerHTML = '';
				}, 500);
			} else {
				document.getElementById('x_notice').innerHTML = megaMan.x.atk_2.name + '<br>' + attack;
				setTimeout(function() {
					document.getElementById('x_notice').innerHTML = '';
				}, 500);
			};
			
		},

		xHPUpdate: function(attack) {
			document.getElementById('x_hp').innerHTML = (megaMan.x.hp -= attack);

			if (attack >= 1000) {
				document.getElementById('sigma_notice').innerHTML = megaMan.sigma.atk_2.name + '<br>' + attack;
				setTimeout(function() {
					document.getElementById('sigma_notice').innerHTML = '';
					var html = $('<li>').text(megaMan.sigma.atk_2.name + ', ' + attack);
					$(html).prependTo('#sigma_console-log');
				}, 500);
			} else {
				document.getElementById('sigma_notice').innerHTML = megaMan.sigma.atk_1.name + '<br>' + attack;
				setTimeout(function() {
					document.getElementById('sigma_notice').innerHTML = '';
					var html = $('<li>').text(megaMan.sigma.atk_1.name + ', ' + attack);
					$(html).prependTo('#sigma_console-log');
				}, 500);
			};
		},

		sigmaFlashRedText: function() {
			$('#sigma_hp').addClass('flash_red');
			setTimeout(function() {
				$('#sigma_hp').removeClass('flash_red');
			}, 250);
		},

		sigmaFlashRed: function() {
				var sigmaDiv = document.getElementById('sigma_div_gif');
				sigmaDiv.className += 'add_red';
				setTimeout(function() {
					sigmaDiv.className = '';
				}, 250);
		},

		sigmaDeadNumber: function() {
			if(!megaMan.sigma.dead){
				setTimeout(function() {
					megaMan.sigma_attack();
				}, 1000);
			};
		},

		xAttack1Count: function() {
			document.getElementById('x_atk1_count').innerHTML = ((megaMan.x.atk_1.count -= 1) + '/50');
		},

		xAttack2Count: function() {
			document.getElementById('x_atk2_count').innerHTML = ((megaMan.x.atk_2.count -= 1) + '/12');
		},

		xAttack3Count: function() {
			document.getElementById('x_atk3_count').innerHTML = ((megaMan.x.atk_3.count -= 1) + '/4');
		},

		xGifAttacked: function() {
			document.getElementById('x_div_gif').innerHTML = '<img id="x_gif2" src="img/x-hurt.gif"/>';
			setTimeout(function() {
				document.getElementById('x_div_gif').innerHTML = '<img id="x_gif" src="img/x.gif"/>';
			}, 250);
		},

		xFlashRed: function() {
			$('#x_hp').addClass('flash_red');
			setTimeout(function() {
				$('#x_hp').removeClass('flash_red');
			}, 250);
		},

		xFlashRedBg: function() {
				var xDiv = document.getElementById('x_div_gif');
				xDiv.className += 'add_red';
				setTimeout(function() {
					xDiv.className = '';
				}, 250);
		},

		checkWin: function() {
			if(megaMan.sigma.hp <= 0){
				megaMan.sigma.dead = true;
				document.getElementById('sigma_hp').innerHTML = 0;
				alert('X WINS!');
				document.getElementById('x_notice2').innerHTML = 'X WINS!';
				document.getElementById('sigma_notice2').innerHTML = '';
				setTimeout(function() {
					window.location.reload();
				}, 5000);
			};
		},

		checkXHealth: function() {
			setTimeout(function(){
				if(megaMan.x.hp <= 1200) {
					document.getElementById('x_notice2').innerHTML = megaMan.x.low;
					document.getElementById('x_div_gif').innerHTML = '<img id="x_gif2" src="img/x-low.gif"/>';
				}
			}, 251);
		},

		checkWinSigma: function() {
			setTimeout(function(){
				if(megaMan.x.hp <= 0){
					megaMan.x.dead = true;
					document.getElementById('x_hp').innerHTML = 0;
					document.getElementById('x_div_gif').innerHTML = '<img id="x_gif_reverse" src="img/x-dead.gif"/>';
					alert('SIGMA WINS!');
					document.getElementById('sigma_notice2').innerHTML = 'SIGMA WINS!';
					document.getElementById('x_notice2').innerHTML = '';
					setTimeout(function() {
						window.location.reload();
					}, 5000);
				}
			}, 251);
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

	}; //end megaMan object

}); //end jQuery wrap
