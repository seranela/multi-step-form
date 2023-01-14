(() => {
	const toggleSwitchBilling = document.getElementById('billing-checkbox');
	const cartChangeLink = document.querySelector('.cart-link');
	const buttonBack = document.getElementById('button-back');
	const buttonNext = document.getElementById('button-next');
	let sections = document.querySelectorAll('.section-step');

	const prices = {
		'plans': {
			'arcade': [9, 90],
			'advanced': [12, 120],
			'pro': [15, 150]
		},
		'addons': {
			'online-service': [1, 10],
			'larger-storage': [2, 20],
			'customizable-profile': [2, 20]
		}
	};

	sessionStorage.setItem('step', 1);

	function updatePlanPricing() {
		const planLabels = document.querySelectorAll('.plan-label1');
		const planCostLabels = document.querySelectorAll('.plan-label2');
		const planBonusLabels = document.querySelectorAll('.plan-label3');

		for (let i = 0; i < planCostLabels.length; ++i) {
			const planName = planLabels[i].innerText.toLowerCase();

			if (toggleSwitchBilling.checked) {
				// Yearly
				planCostLabels[i].innerText = '$' + prices.plans[planName][1] + '/yr';
				planBonusLabels[i].classList.remove('hidden');
			} else {
				// Monthly (Default)
				planCostLabels[i].innerText = '$' + prices.plans[planName][0] + '/mo';
				planBonusLabels[i].classList.add('hidden');
			}
		}
	}

	function toggleSwitch(e) {
		updatePlanPricing();
		let button = e.target;
		if (button.getAttribute('aria-pressed') === 'false') {
			button.setAttribute('aria-pressed', 'true');
		} else {
			button.setAttribute('aria-pressed', 'false');
		}
	}

	function updateAddonsPricing() {
		const addonCosts = document.querySelectorAll('.addon-cost');
		for (let i = 0; i < addonCosts.length; ++i) {
			// Unary conversion of boolean to integer using (+)
			let cost = prices.addons[addonCosts[i].dataset.key][+ toggleSwitchBilling.checked];
			let period = (toggleSwitchBilling.checked ? 'yr' : 'mo');
			addonCosts[i].innerText = `+$${cost}/${period}`;
		}
	}

	function updateCartReview() {
		/* Update Plan Choice and Cost */

		const planType = document.querySelector('.cart-plan');

		// Get chosen plan name and convert it to titlecase for display
		let planName = sessionStorage.getItem('plan-choice');
		planName = planName.replace(planName.charAt(0), planName.charAt(0).toUpperCase());

		if (toggleSwitchBilling.checked) {
			// Yearly
			planType.innerText = planName + ' (Yearly)';
		} else {
			// Monthly
			planType.innerText = planName + ' (Monthly)';
		}

		/* Review Choices */

		let totalCost = 0;

		// Update plan pricing
		const planCost = document.getElementById('plan-cost');
		let cost = prices.plans[planName.toLowerCase()][+ toggleSwitchBilling.checked];
		totalCost += cost;
		let period = (toggleSwitchBilling.checked ? 'yr' : 'mo');
		planCost.innerText = `$${cost}/${period}`;

		// Update addon pricing
		const addonCosts = document.querySelectorAll('#addon-online-service-cost, #addon-larger-storage-cost, #addon-customizable-profile-cost');
		let addonsSelected = sessionStorage.getItem('plan-addons').split(',');
		for (let i = 0; i < addonCosts.length; ++i) {
			let dataId = addonCosts[i].dataset.key.replace(' ', '-');
			let cost = prices.addons[dataId][+ toggleSwitchBilling.checked];
			// If the addon was chosen, show it and add it to the total
			let addonRow = document.getElementById('addon-' + dataId);
			if (addonsSelected.includes(dataId.replace('-', ' '))) {
				addonRow.classList.remove('hidden');
				totalCost += cost;
			} else {
				addonRow.classList.add('hidden');
			}
			addonCosts[i].innerText = `+$${cost}/${period}`;
		}

		// Update total price
		const totalLabelObj = document.getElementById('cart-total-label');
		if (toggleSwitchBilling.checked) {
			// Yearly
			totalLabelObj.innerText = 'Total (per year)';
		} else {
			// Monthly
			totalLabelObj.innerText = 'Total (per month)';
		}
		const totalCostObj = document.getElementById('cart-total-cost');
		totalCostObj.innerText = `$${totalCost}/${period}`;
	}

	function changePlan() {
		sessionStorage.setItem('step', 2);

		// Setup tabbing based on current section
		setTabbing(2);

		// Show/hide form buttons
		buttonNext.innerText = 'Next Step';

		// Update step number visual
		document.getElementById('step-icon4').classList.remove('step-icon-active');
		document.getElementById('step-icon2').classList.add('step-icon-active');

		// Show/hide sections
		const prevSection = document.getElementById('section-step4');
		const nextSection = document.getElementById('section-step2');
		prevSection.classList.remove('section-step-back-active', 'section-step-next-active');
		prevSection.classList.add('section-step-back-inactive');
		nextSection.classList.remove('section-step-back-inactive', 'section-step-next-inactive');
		nextSection.classList.add('section-step-back-active');
	}

	function setTabbing(sectionNumber) {
		// Section 1
		const personalInfos = document.querySelectorAll('.form-input');
		for (let i = 0; i < personalInfos.length; ++i) {
			if (sectionNumber === 1)
				personalInfos[i].removeAttribute('tabindex');
			else
				personalInfos[i].setAttribute('tabindex', '-1');
		}

		// Section 2
		const planChoices = document.querySelectorAll('.plan-radio');
		for (let i = 0; i < planChoices.length; ++i) {
			if (sectionNumber === 2)
				planChoices[i].removeAttribute('tabindex');
			else
				planChoices[i].setAttribute('tabindex', '-1');
		}
		const planPeriod = document.getElementById('billing-checkbox');
		if (sectionNumber === 2)
			planPeriod.removeAttribute('tabindex');
		else
			planPeriod.setAttribute('tabindex', '-1');

		// Section 3
		const addons = document.querySelectorAll('.addon-checkbox');
		for (let i = 0; i < addons.length; ++i) {
			if (sectionNumber === 3)
				addons[i].removeAttribute('tabindex');
			else
				addons[i].setAttribute('tabindex', '-1');
		}

		// Section 4
		const cartLink = document.querySelector('.cart-link');
		if (sectionNumber === 4)
			cartLink.removeAttribute('tabindex');
		else
			cartLink.setAttribute('tabindex', '-1');

		// Section 5
		const supportLink = document.getElementById('support-link');
		if (sectionNumber === 5)
			supportLink.removeAttribute('tabindex');
		else
			supportLink.setAttribute('tabindex', '-1');
	}

	function goBack() {
		const currentStep = sessionStorage.getItem('step');

		switch (currentStep) {
			case '2':
				const inputName = document.getElementById('name');
				const inputEmail = document.getElementById('email');
				const inputPhone = document.getElementById('phone');

				if (inputName.validity.valid &&
					inputEmail.validity.valid &&
					inputPhone.validity.valid) {
					// Save data - insert form level data
					sessionStorage.setItem('name', inputName.value);
					sessionStorage.setItem('email', inputEmail.value);
					sessionStorage.setItem('phone', inputPhone.value);

					// Go to previous section
					sessionStorage.setItem('step', 1);

					// Setup tabbing based on current section
					setTabbing(1);

					// Show/hide form buttons
					buttonBack.classList.add('invisible');

					// Update step number visual
					document.getElementById('step-icon2').classList.remove('step-icon-active');
					document.getElementById('step-icon1').classList.add('step-icon-active');

					// Transition form sections by updating CSS variable
					for (let i = 0; i < sections.length; ++i) {
						sections[i].style.setProperty('--section-offset', '0%');
					}
				}

				break;
			case '3':
				const planChoice = document.querySelector('input[name="plan"]:checked').value;
				const planPeriod = document.getElementById('billing-checkbox').checked;

				// Save data
				sessionStorage.setItem('plan-choice', planChoice);
				sessionStorage.setItem('plan-period', planPeriod);

				// Set previous section
				sessionStorage.setItem('step', 2);

				// Prep values for previous section
				updatePlanPricing();

				// Setup tabbing based on current section
				setTabbing(2);

				// Show/hide form buttons
				buttonBack.classList.remove('invisible');
				buttonNext.innerText = 'Next Step';

				// Update step number visual
				document.getElementById('step-icon3').classList.remove('step-icon-active');
				document.getElementById('step-icon2').classList.add('step-icon-active');

				// Transition form sections by updating CSS variable
				for (let i = 0; i < sections.length; ++i) {
					sections[i].style.setProperty('--section-offset', '-100%');
				}

				break;
			case '4':
				let addons = [];
				document.querySelectorAll('input[name="addons"]:checked').forEach((addon) => {
					addons.push(addon.value);
				});

				// Save data
				sessionStorage.setItem('plan-addons', addons);

				// Set previous section
				sessionStorage.setItem('step', 3);

				// Prep values for previous section
				updateAddonsPricing();

				// Setup tabbing based on current section
				setTabbing(3);

				// Show/hide form buttons
				buttonBack.classList.remove('invisible');
				buttonNext.innerText = 'Next Step';

				// Update step number visual
				document.getElementById('step-icon4').classList.remove('step-icon-active');
				document.getElementById('step-icon3').classList.add('step-icon-active');

				// Transition form sections by updating CSS variable
				for (let i = 0; i < sections.length; ++i) {
					sections[i].style.setProperty('--section-offset', '-200%');
				}

				break;
		}
	}

	function goNext() {
		const currentStep = sessionStorage.getItem('step');

		switch (currentStep) {
			case '1':
				const inputName = document.getElementById('name');
				const inputEmail = document.getElementById('email');
				const inputPhone = document.getElementById('phone');

				if (inputName.validity.valid &&
					inputEmail.validity.valid &&
					inputPhone.validity.valid) {
					// Save data - insert form level data
					sessionStorage.setItem('name', inputName.value);
					sessionStorage.setItem('email', inputEmail.value);
					sessionStorage.setItem('phone', inputPhone.value);

					// Set next section
					sessionStorage.setItem('step', 2);

					// Prep values for next section
					updatePlanPricing();

					// Setup tabbing based on current section
					setTabbing(2);

					// Show/hide form buttons
					buttonBack.classList.remove('invisible');
					buttonNext.innerText = 'Next Step';

					// Update step number visual
					document.getElementById('step-icon1').classList.remove('step-icon-active');
					document.getElementById('step-icon2').classList.add('step-icon-active');

					// Transition form sections by updating CSS variable
					for (let i = 0; i < sections.length; ++i) {
						sections[i].style.setProperty('--section-offset', '-100%');
					}
				}

				break;
			case '2':
				const planChoice = document.querySelector('input[name="plan"]:checked').value;
				const planPeriod = document.getElementById('billing-checkbox').checked;

				// Save data
				sessionStorage.setItem('plan-choice', planChoice);
				sessionStorage.setItem('plan-period', planPeriod);

				// Set next section
				sessionStorage.setItem('step', 3);

				// Prep values for next section
				updateAddonsPricing();

				// Setup tabbing based on current section
				setTabbing(3);

				// Show/hide form buttons
				buttonBack.classList.remove('invisible');
				buttonNext.innerText = 'Next Step';

				// Show/hide form buttons
				buttonBack.classList.remove('invisible');
				buttonNext.innerText = 'Next Step';

				// Update step number visual
				document.getElementById('step-icon2').classList.remove('step-icon-active');
				document.getElementById('step-icon3').classList.add('step-icon-active');

				// Transition form sections by updating CSS variable
				for (let i = 0; i < sections.length; ++i) {
					sections[i].style.setProperty('--section-offset', '-200%');
				}

				break;
			case '3':
				let addons = [];
				document.querySelectorAll('input[name="addons"]:checked').forEach((addon) => {
					addons.push(addon.value);
				});

				// Save data
				sessionStorage.setItem('plan-addons', addons);

				// Set next section
				sessionStorage.setItem('step', 4);

				// Prep values for next section
				updateCartReview();

				// Setup tabbing based on current section
				setTabbing(4);

				// Show/hide form buttons
				buttonBack.classList.remove('invisible');
				buttonNext.innerText = 'Confirm';

				// Update step number visual
				document.getElementById('step-icon3').classList.remove('step-icon-active');
				document.getElementById('step-icon4').classList.add('step-icon-active');

				// Transition form sections by updating CSS variable
				for (let i = 0; i < sections.length; ++i) {
					sections[i].style.setProperty('--section-offset', '-300%');
				}

				break;
			case '4':
				// Clear out the temporary sessionStorage
				sessionStorage.clear();

				// Send form data to back-end for processing and verification with AJAX.
				// AJAX calls omitted since this is for presentation purposes only.
				// Assume successful submission at this point.

				// Setup tabbing based on current section
				setTabbing(5);

				// Hide the form buttons
				buttonBack.classList.add('invisible');
				buttonNext.classList.add('invisible');

				// Update step number visual
				document.getElementById('step-icon4').classList.remove('step-icon-active');

				// Transition form sections by updating CSS variable
				// Show thank you message
				for (let i = 0; i < sections.length; ++i) {
					sections[i].style.setProperty('--section-offset', '-400%');
				}

				break;
		}
	}

	function onLoad() {
		const planChoices = document.querySelectorAll('.plan-radio');
		for (let i = 0; i < planChoices.length; ++i) {
			planChoices[i].setAttribute('tabindex', '-1');
		}
		const planPeriod = document.getElementById('billing-checkbox');
		planPeriod.setAttribute('tabindex', '-1');

		const addons = document.querySelectorAll('.addon-checkbox');
		for (let i = 0; i < addons.length; ++i) {
			addons[i].setAttribute('tabindex', '-1');
		}

		const cartLink = document.querySelector('.cart-link');
		cartLink.setAttribute('tabindex', '-1');

		const supportLink = document.getElementById('support-link');
		supportLink.setAttribute('tabindex', '-1');
	}

	toggleSwitchBilling.addEventListener('click', toggleSwitch, false);
	cartChangeLink.addEventListener('click', changePlan, false);
	buttonBack.addEventListener('click', goBack, false);
	buttonNext.addEventListener('click', goNext, false);
	window.addEventListener('load', onLoad, false);
})();