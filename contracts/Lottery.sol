pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;
    address private owner;
    address public lastWinner;


    function Lottery() public {
        manager = msg.sender;
        owner = msg.sender;
    }

    function enter() public payable {
        players.push(msg.sender);
    }

    function random() private view returns (uint256) {
        return uint256(keccak256(block.difficulty, now, players));
    }

    function pickWinner() public restricted payable{
        uint256 index = random() % players.length;
        players[index].transfer(this.balance);
        lastWinner = players[index];
        players = new address[](0);
    }

    function getPlayers() public view returns (address[]) {
        return players;
    }

    function getBalance() public view returns (uint256) {
        return owner.balance;
    }

    modifier restricted() {
        require(msg.sender == manager);
        _; // replaced with the code in the function where the restricted modifier is called
    }
}
