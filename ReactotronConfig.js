import Reactotron, {
    trackGlobalErrors,
    openInEditor,
    overlay,
    asyncStorage,
    networking
} from "reactotron-react-native"

Reactotron.configure({
    name: ''
})
    .use(trackGlobalErrors())
    .use(openInEditor())
    .use(overlay())
    .use(asyncStorage())
    .use(networking({
        ignoreContentTypes: /^(image)\/.*$/i,
        ignoreUrls: /\/(logs|symbolicate)$/,
    }))
    .connect()
