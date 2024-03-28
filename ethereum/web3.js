import Web3 from 'web3';

let web3;

// inside browser & metamask available
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
	web3 = new Web3(window.web3.currentProvider);
} else {
	const provider = new Web3.providers.HttpProvider(
		'https://rinkeby.infura.io/v3/dd214a51646245cdb34fedc3d67ac56f'
	);
	web3 = new Web3(provider);
}

export default web3;
