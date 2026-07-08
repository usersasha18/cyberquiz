import SaveAccount from "../games/SaveAccount.jsx";
import Encrypt from "../games/Encrypt.jsx";
import { useRouter } from "../routerContext";

export default function GamePages() {
    const { path } = useRouter();

    const gameId = path.split("/")[2];

    switch (gameId) {
        case "save-account":
            return <SaveAccount />;

        case "encrypt":
            return <Encrypt />;

        default:
            return <h2>Игра не найдена</h2>;
    }
}