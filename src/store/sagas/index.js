import { all } from 'redux-saga/effects'
import { watchFetchUserAsync, watchSignOutUser, watchSetUserPreferredTheme } from './user'
import { watchSaveDocumentAsync, watchOpenDocument, watchLoadDocumentAndOpenEditor, watchSaveActiveDocumentAndClose, watchCreateNewDocument } from './editor'
import { watchFetchDocumentsAsync, watchPrependDocumentAndSave, watchRemoveDocumentAndSave, watchUpdateDocumentAndSave, watchUpdateDocumentNotTimestampAndSave } from './documents'

export default function* rootSaga() {
    yield all([
        watchFetchUserAsync(),
        watchSignOutUser(),
        watchSetUserPreferredTheme(),
        watchSaveDocumentAsync(),
        watchFetchDocumentsAsync(),
        watchOpenDocument(),
        watchLoadDocumentAndOpenEditor(),
        watchSaveActiveDocumentAndClose(),
        watchCreateNewDocument(),
        watchPrependDocumentAndSave(),
        watchRemoveDocumentAndSave(),
        watchUpdateDocumentAndSave(),
        watchUpdateDocumentNotTimestampAndSave(),
    ])
}
