import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel
} from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
type FilterType = {
    id: string;
    name: string;
    options: OptionType[]
};
type OptionType = {
    value: string;
    label: string;
    checked: boolean
};

type FiltersProps = {
    filters: FilterType[],
    onFilterChange: (sectionId: string, optionValue: string, checked: boolean) => void;
}
const FiltersComponent = (props: FiltersProps ) => {
    const handleCheckboxChange = (sectionId: string, optionValue: string, event: React.ChangeEvent<HTMLInputElement>) => {
        props.onFilterChange(sectionId, optionValue, event.target.checked);
    };

    return (
        <div className="grid grid-cols-1 gap-x-8 gap-y-10">
            {/* Filters */}
            <form className="hidden lg:block">
                {props.filters.map((section) => (
                    <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                        <h3 className="-my-3 flow-root">
                            <DisclosureButton
                                className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                    <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden"/>
                                    <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden"/>
                                </span>
                            </DisclosureButton>
                        </h3>
                        <DisclosurePanel className="pt-6">
                            <div className="space-y-4">
                                {section.options.map((option, optionIdx) => (
                                    <div key={option.value} className="flex items-center">
                                        <input
                                            defaultValue={option.value}
                                            defaultChecked={option.checked}
                                            id={`filter-${section.id}-${optionIdx}`}
                                            name={`${section.id}[]`}
                                            type="checkbox"
                                            onChange={(e) => handleCheckboxChange(section.id, option.value, e)}
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <label htmlFor={`filter-${section.id}-${optionIdx}`}
                                               className="ml-3 text-sm text-gray-600">
                                            {option.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </DisclosurePanel>
                    </Disclosure>
                ))}
            </form>
        </div>
    )
};

export default FiltersComponent;