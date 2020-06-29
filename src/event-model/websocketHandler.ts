import {Observable} from "rxjs"
import {map, merge} from "rxjs/operators";
import {RxStomp} from '@stomp/rx-stomp';
import {GameStateEvent} from "./eventTypes";
import {getBackendUrl, getHttpSubscribtion} from "../be-gateway/gateway";

export default class WebsocketHandler {



    getSubscription(gameId : string) : Observable<GameStateEvent> {
        return this.getWsSubscription(gameId).pipe(merge(getHttpSubscribtion(gameId)));
    }

    getWsSubscription(gameId : string) : Observable<GameStateEvent> {
        const WEBSOCKET_URL = getBackendUrl().replace("http", "ws");

        const stompConfig = {
            brokerURL: `${WEBSOCKET_URL}/decrypto-ws`,
            reconnectDelay: 200
        };

        let rxStomp$ = new RxStomp();
        rxStomp$.configure(stompConfig);
        rxStomp$.activate();

        return rxStomp$.watch("/game/messages/" + gameId)
            .pipe(map(function (message) {
                return JSON.parse(message.body) as unknown;
            }))
            .pipe(map(event => event as GameStateEvent));
    }


}
