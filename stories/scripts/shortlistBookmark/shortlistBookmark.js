import {
    DEFAULT,
    ADDED,
    ACTIVE,
    REMOVE,
    REMOVED,
    NEXT,
    PREV
} from '../../configs/strings';

export class SGShortlistBookmark {
    bookmarkElement; // main Shortlist Bookmark container
    bookmarkMessage; // message element in the bookmark
    bookmarkIcon; // icon element in the bookmark

    shortlistMessageHideClass = 'sg-shortlist-bookmark__message--hidden'; // class to hide the Shortlist message
    shortlistMessageGrowClass = 'sg-shortlist-bookmark__message--grow'; // animation class for message growing
    shortlistMessageShrinkClass = 'sg-shortlist-bookmark__message--shrink'; // animation class for message shrinking
    mainShortlistClass = 'sg-shortlist-bookmark'; // main class of the bookmarkElement

    settings = {
        shortlistLink: '', // link for going to the Shortlist page for the ACTIVE state of the bookmark
        addCompanyToShortlistCallback: null,  // callback function to execute after user adds company to Shortlist
        removeCompanyFromShortlistCallback: null, // callback function to execute after user removes company from Shortlist
        skipActiveState: false // if we need to skip the ACTIVE state
    };

    state; // current state of the bookmark

    // Table of next and prev states for every state
    nextAndPrevStates = {
        [DEFAULT]: {
            [NEXT]: ADDED,
            [PREV]: ACTIVE
        },
        [ADDED]: {
            [NEXT]: ACTIVE,
            [PREV]: DEFAULT
        },
        [ACTIVE]: {
            [NEXT]: REMOVE,
            [PREV]: DEFAULT
        },
        [REMOVE]: {
            [NEXT]: REMOVED,
            [PREV]: ACTIVE
        },
        [REMOVED]: {
            [NEXT]: DEFAULT,
            [PREV]: ACTIVE
        }
    };

    // Table of class names for every state
    stateClassNames = {
        [DEFAULT]: 'sg-shortlist-bookmark--default',
        [ADDED]: 'sg-shortlist-bookmark--added',
        [ACTIVE]: 'sg-shortlist-bookmark--active',
        [REMOVE]: 'sg-shortlist-bookmark--remove',
        [REMOVED]: 'sg-shortlist-bookmark--removed'
    };

    // Table of messages for every state
    stateMessage = {
        [DEFAULT]: 'Add to Shortlist?',
        [ADDED]: 'Added to Shortlist',
        [ACTIVE]: 'View Shortlist',
        [REMOVE]: 'Remove from Shortlist?',
        [REMOVED]: 'Removed from Shortlist'
    };

    constructor(bookmarkElement, settings) {
        this.bookmarkElement = bookmarkElement;
        this.bookmarkMessage = this.bookmarkElement.querySelector('.sg-shortlist-bookmark__message');
        this.bookmarkIcon = this.bookmarkElement.querySelector('.sg-shortlist-bookmark__icon');
        this.settings = {...settings};
        this.state = this.settings.initialState;
        this.stateMessage[ACTIVE] = this.settings.skipActiveState ? '' : 'View Shortlist';

        this.init();
    }

    init() {
        this.addListeners();
        this.changeStateClass();
    }

    // Add listeners for the main shortlist bookmark element
    addListeners() {
        // Mouse enter listener on the main bookmark element
        this.bookmarkElement.addEventListener('mouseenter', () => {
            // Check if we need to skip the ACTIVE state and show the next state
            if (this.settings.skipActiveState && this.state === ACTIVE) {
                this.changeState(NEXT).then(() => {
                    this.showMessage();
                });
            } else {
                this.showMessage();
            }
        });

        // Mouse leave listener on the main bookmark element
        this.bookmarkElement.addEventListener('mouseleave', () => {
            // Hide message
            this.hideMessage().then(() => {
                // Additional actions on the mouse leave event
                switch (this.state) {
                    case ADDED:
                    case REMOVED:
                        // If the profile was removed from the shortlist or added to the shortlist - move to next state (default) on mouse leave
                        this.changeState(NEXT);
                        break;
                    case REMOVE:
                        // If the user called the remove state but didn't clicked the message - move to prev state (default) on mouse leave
                        this.changeState(PREV);
                    }
            });
        });

        // Click listener on the bookmark message
        this.bookmarkMessage.addEventListener('click', () => this.messageClick());
        // Click listener on the bookmark icon
        this.bookmarkIcon.addEventListener('click', () => this.iconClick());
    }

    // Show bookmark message
    showMessage() {
        this.changeMessage();

        // Add animation class
        this.bookmarkElement.classList.add(this.shortlistMessageGrowClass);

        setTimeout(() => {
            // Remove hiding class
            this.bookmarkMessage.classList.remove(this.shortlistMessageHideClass);
            // Remove animation class
            this.bookmarkElement.classList.remove(this.shortlistMessageGrowClass);
        }, 50);
    }

    // Change text of the message
    changeMessage() {
        // Get message for the current state
        const messageText = this.stateMessage[this.state];
        // Update text of the message element
        this.bookmarkMessage.innerText = messageText;
    }

    // Hide bookmark message
    hideMessage() {
        return new Promise(resolve => {
            // Clear the text
            this.bookmarkMessage.innerText = '';

            // Add animation class
            this.bookmarkElement.classList.add(this.shortlistMessageShrinkClass);

            setTimeout(() => {
                // Add hiding class
                this.bookmarkMessage.classList.add(this.shortlistMessageHideClass);
                // Remove animation class
                this.bookmarkElement.classList.remove(this.shortlistMessageShrinkClass);
                resolve();
            }, 50);
        });
    }

    getNextState() {
        return this.nextAndPrevStates[this.state].next;
    }

    getPrevState() {
        return this.nextAndPrevStates[this.state].prev;
    }

    // Change the current state
    changeState(direction) {
        return new Promise(resolve => {
            if (direction === NEXT) {
                this.state = this.getNextState();
            } else {
                this.state = this.getPrevState();
            }

            this.changeStateClass();
            this.changeMessage();

            resolve();
        });
    }

    // Change the class of the main Shortlist Bookmark element
    changeStateClass() {
        // Get new class
        const newClass = this.stateClassNames[this.state];
        // Update class names to main class + new class
        this.bookmarkElement.className = `${this.mainShortlistClass} ${newClass}`;
    }

    // Click on the bookmark message
    messageClick() {
        // Do different actions for different states
        switch (this.state) {
        case DEFAULT:
        case REMOVE:
            this.changeState(NEXT);
            this.executeCallbackFunctions().then((result) => {
                // Don't do anything if the request was successful
                if (result) return;

                // Change state to prev if the request wasn't successful
                setTimeout(() => {
                    this.changeState(PREV);
                }, 1000);
            });
            break;
        case ACTIVE:
            this.goToShortlistPage();
        }
    }

    // Click on the bookmark icon
    iconClick() {
        // Do different actions for different states
        switch (this.state) {
        case DEFAULT:
        case REMOVE:
            this.changeState(NEXT);
            this.executeCallbackFunctions().then((result) => {
                // Don't do anything if the request was successful
                if (result) return;

                // Change state to prev if the request wasn't successful
                setTimeout(() => {
                    this.changeState(PREV);
                }, 1000);
            });
            break;
        case ACTIVE:
            this.changeState(NEXT);
        }
    }

    // Direct user to the Shortlist page
    goToShortlistPage() {
        document.location.href = this.settings.shortlistLink;
    }

    executeCallbackFunctions() {
        return new Promise((resolve) => {
            switch (this.state) {
            case ADDED:
                if (typeof this.settings.addCompanyToShortlistCallback === 'function') {
                    this.settings.addCompanyToShortlistCallback(this.bookmarkElement).then(result => resolve(result));
                }
                break;
            case REMOVED:
                if (typeof this.settings.removeCompanyFromShortlistCallback === 'function') {
                    this.settings.removeCompanyFromShortlistCallback(this.bookmarkElement).then(result => resolve(result));
                }
            }
        });
    }
}
