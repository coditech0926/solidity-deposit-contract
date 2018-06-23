const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);

const compiledFactory = require('../ethereum/build/DepositFactory.json');
const compiledDeposit = require('../ethereum/build/Deposit.json');

let accounts;
let factory;
let depositAddress;
let deposit;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000' });
  factory.setProvider(provider);

  await factory.methods.createDeposit().send({
    from: accounts[0],
    gas: '1000000'
  });

  //Fancy way to do const array = await...; campaignAddress = array[0];
  [depositAddress] = await factory.methods.getDeployedDeposits().call();
  deposit = await new web3.eth.Contract(
    JSON.parse(compiledDeposit.interface),
    depositAddress
  );
  campaign.setProvider(provider);
});

describe('Deposits', () => {
  //it('deploys a factory and a deposit', () => {
    //assert.ok(factory.options.address);
    //assert.ok(deposit.options.address);
  //});

  //it('marks caller as the deposit manager', async () => {
    //const manager = await deposit.methods.initiator().call();
    //assert.equal(accounts[0], manager);
  //});

  //it('allows people to contribute money and marks them as approvers', async () => {
    //await campaign.methods.contribute().send({
      //value: '200',
      //from: accounts[1]
    //});
    //const isContributor = await campaign.methods.approvers(accounts[1]).call();
    //assert(isContributor);
  //});

  //it('requires a minimum contribution', async () => {
    //try {
      //await campaign.methods.contribute().send({
        //value: '5',
        //from: accounts[1]
      //});
      //assert(false);
    //} catch (err) {
      //assert(err);
    //}
  //});

  //it('allows a manager to make a payment request', async () => {
    //await campaign.methods
      //.createRequest('Buy batteries', '100', accounts[1])
      //.send({
        //from: accounts[0],
        //gas: '1000000'
      //});
    //const request = await campaign.methods.requests(0).call();

    //assert.equal('Buy batteries', request.description);
  //});

  //it('processes requests', async () => {
    //await campaign.methods.contribute().send({
      //from: accounts[0],
      //value: web3.utils.toWei('10', 'ether')
    //});

    //await campaign.methods
      //.createRequest('A', web3.utils.toWei('5', 'ether'), accounts[1])
      //.send({ from: accounts[0], gas: '1000000' });

    //await campaign.methods.approveRequest(0).send({
      //from: accounts[0],
      //gas: '1000000'
    //});

    //await campaign.methods.finalizeRequest(0).send({
      //from: accounts[0],
      //gas: '1000000'
    //});

    //let balance = await web3.eth.getBalance(accounts[1]);
    //balance = web3.utils.fromWei(balance, 'ether');
    //balance = parseFloat(balance);

    //assert(balance > 104);
  //});
});