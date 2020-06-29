"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var PlayerList = /** @class */ (function (_super) {
    __extends(PlayerList, _super);
    function PlayerList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayerList.prototype.render = function () {
        var playerList = this.props.playerList;
        return <div className="section-container playerList">
            <h3>Players</h3>
            {playerList &&
            <ul>
                    {playerList.map(function (player) { return <li key={player}>{player}</li>; })}
                </ul>}
            {!playerList &&
            <span>No players currently registered</span>}
        </div>;
    };
    return PlayerList;
}(react_1.Component));
exports.default = PlayerList;
