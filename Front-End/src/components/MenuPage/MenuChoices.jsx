import { useEffect, useState } from "react";
import PropTypes, { object } from 'prop-types';
import './MenuChoices.css';

/**
 * Component for displaying and managing menu item selections.
 * @param {Object} props - The props for the component.
 * @param {Object} props.menuItemSelection - The current menu item being selected, containing details like maximum sides or entrees allowed.
 * @param {Map} props.itemComponents - A map of item categories to their respective components for display.
 * @param {string} props.view - The current view or type of item being selected (e.g., "side", "entrees", "drink").
 * @param {function} props.onContinue - Callback function triggered when the continue button is clicked.
 * @returns {JSX.Element} The MenuChoices component.
 */
export default function MenuChoices({ menuItemSelection, itemComponents, view, onContinue}) {
    /** @type {Array} State to manage the selected menu choices */
    const [selectedMenuChoices, setSelectedMenuChoices] = useState([]);
    /** @type {string} State to manage the label of the action button */
    const [buttonLabel, setButtonLabel] = useState("");
    /** @type {number} State to manage the maximum number of choices allowed */
    const [maxChoices, setMaxChoices] = useState(1);
    /** @type {string} State to manage the title displayed for the selection view */
    const [title, setTitle] = useState("");
    /** @type {Array} State to manage the list of item components to display */
    const [displayItemComponents, setDisplayItemComponents] = useState([]);
    const [isSelected, setIsSelected] = useState(true);

    const showAllergens = (itemComponent) => {
        if(itemComponent.allergens.length > 0)
        {
            let allergenMessage = "This item contains the following allergens: ";
            for(let i = 0; i < itemComponent.allergens.length; i++)
            {
                if(itemComponent.allergens[i] == "")
                    return;
                if(i == itemComponent.allergens.length - 1 && itemComponent.allergens.length > 1)
                    allergenMessage += " and ";
                allergenMessage += itemComponent.allergens[i];
                if(i != itemComponent.allergens.length - 1 && i != itemComponent.allergens.length - 2)
                    allergenMessage += ", ";
            }
            alert(allergenMessage);
        }
    };
    /**
     * useEffect hook to set max number of choices, title, and displayed items based on the current view.
     */
    useEffect(() => {
        if (!menuItemSelection || Object.keys(menuItemSelection).length === 0){
            return;
        }

        let updatedMaxChoices;

        if (view === "drink" || view === "appetizer" || view === "A La Carte") {
            updatedMaxChoices = 1;
        } else if (view === "side") {
            updatedMaxChoices = menuItemSelection.menuItem.maxsides;
        } else {
            updatedMaxChoices = menuItemSelection.menuItem.maxentrees;
        }
        setMaxChoices(updatedMaxChoices);

        if (view === "A La Carte"){
            setDisplayItemComponents([...itemComponents.get("side"), ...itemComponents.get("entrees")]);
            setTitle(`Select ${updatedMaxChoices} Side or Entree`);
        } else{
            setDisplayItemComponents(itemComponents.get(view));
            setTitle(`Select ${updatedMaxChoices} ${view.charAt(0).toUpperCase() + view.slice(1)}`);
        }
        setSelectedMenuChoices([])
    }, [itemComponents, view, menuItemSelection, setMaxChoices]);

    /**
     * useEffect hook to set the button label based on the current view and menu item selection.
     */
    useEffect(() => {
        if (view === "A La Carte" || view === "appetizer" || view === "drink" || (view === "entrees" && menuItemSelection?.menuItem?.name !== "Panda Bundle")) {
            setButtonLabel("Add Selection to Cart");
        } else {
            setButtonLabel("Continue");
        }
    }, [view, menuItemSelection]);

    /**
     * Toggles the selection of a menu choice.
     * @param {Object} menuChoice - The menu choice to be toggled.
     */
    const toggleMenuChoice = (menuChoice) => {
        if(isSelected)
            showAllergens(menuChoice);
        setIsSelected(prevState => !prevState);
        setSelectedMenuChoices((prevChoices) => {
            if (prevChoices.includes(menuChoice)) {
                return prevChoices.filter(choice => choice.name !== menuChoice.name);
            } else if (prevChoices.length < maxChoices) {
                return [...prevChoices, menuChoice];
            }
            return prevChoices;
        });
    };

    /**
     * Handles the click event for the continue button.
     */
    const handleContinue = () => {
        setIsSelected(true);
        if (selectedMenuChoices.length > 0) {
            onContinue(selectedMenuChoices);
            setSelectedMenuChoices([]);
        }
    };

    const handleNutrition = (menuChoice) => {  
        return (
            <div>
                <h1>{menuChoice.name} Nutritional Information</h1>
                <h2>{menuChoice.serving_size}\n{menuChoice.calories} </h2>
            </div>
        )
    };

    // Render fallback message if no menu item selection is available
    if (!menuItemSelection || Object.keys(menuItemSelection).length === 0) {
        return <div className="font-bold text-2xl">Select Menu Item</div>;
    }    

    return (
        <div className="menu-choices">
            <h2>{title}</h2>
            <div className="choices-list">
                {displayItemComponents?.map((itemComponent, index) => (
                    <button 
                        key={index} 
                        className={`choice-item ${selectedMenuChoices.some(choice => choice.name === itemComponent.name) ? 'selected' : ''}`} 
                        onClick={() => toggleMenuChoice(itemComponent)} 
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleMenuChoice(itemComponent); }}
                        aria-pressed={selectedMenuChoices.some(choice => choice.name === itemComponent.name)}
                        type="button"
                    >
                        <button onClick={handleNutrition(itemComponent)} className="underline hover:bg-maroon">
                            Nutrition
                        </button>
                        <img src={itemComponent.image} alt={`${itemComponent.name}`} className="menu-choice-image" />
                        <h3>{itemComponent.name}</h3>
                    </button>
                ))}
            </div>
            <button 
                className={`continue-button ${selectedMenuChoices.length > 0 ? 'active' : 'disabled'}`} 
                onClick={handleContinue} 
                disabled={selectedMenuChoices.length < maxChoices}
            >
                {buttonLabel}
            </button>
        </div>
    );
}

MenuChoices.propTypes = {
    menuItemSelection: PropTypes.object.isRequired,
    itemComponents: PropTypes.instanceOf(Map).isRequired,
    view: PropTypes.string.isRequired,
    onContinue: PropTypes.func.isRequired
};
