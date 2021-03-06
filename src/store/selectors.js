import { filter } from "lodash";

// Global
export const isLoading = store => store.global.loading;

// User
export const isUserSignedIn = store => !!store.user.user;
export const isUserPending = store => store.user.pending;
export const getUser = store => store.user.user;

// Themeing and display
export const getTheme = store => store.display.theme;

// Documents
export const getDocuments = store => store.documents.documents;
export const areDocumentsLoaded = store => store.documents.areDocumentsLoaded;
export const getDocumentFilterTerm = store => store.documents.filterTerm;
export const getDocumentFilterTags = store => store.documents.tags;
export const getActiveDropDownTag = store => store.documents.activeDropDownTag;
export const getFilteredDocuments = store => {
    const filterTerm = getDocumentFilterTerm(store)
    const activeFilterTags = Object.entries(getDocumentFilterTags(store)).filter(keyVal => keyVal[1] === true).map(keyVal => keyVal[0])

    if (filterTerm === '' && activeFilterTags.length === 0) {
        return store.documents.documents;
    } else if (activeFilterTags.length === 0) {
        return store.documents.documents.filter(doc => doc.title.toLowerCase().startsWith(filterTerm));
    } else if (filterTerm === '') {
        return store.documents.documents.filter(doc => activeFilterTags.includes(doc.tag));
    } else {
        return store.documents.documents.filter(doc => doc.title.toLowerCase().startsWith(filterTerm) && activeFilterTags.includes(doc.tag));
    }
}


// Editor
export const getActiveDocumentId = store => store.editor.activeDocument.id;
export const getActiveDocumentTitle = store => store.editor.activeDocument.title;
export const getActiveDocumentValue = store => store.editor.activeDocument.value;

export const getShortcutTarget = store => store.editor.shortcut.target;
export const getShortcutSearch = store => store.editor.shortcut.search;
export const getShortcutDropdownIndex = store => store.editor.shortcut.dropdownIndex;

export const isActiveDocumentLoaded = store => store.editor.activeDocument.id !== '';
export const isSavePending= store => store.editor.savePending;
