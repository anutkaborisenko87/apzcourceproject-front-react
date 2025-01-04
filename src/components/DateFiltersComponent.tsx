import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel
} from '@headlessui/react';
import {MinusIcon, PlusIcon} from '@heroicons/react/20/solid';

type FilterType = {
    id: string;
    name: string;
    from?: FromToType;
    to?: FromToType;
};
type FromToType = {
    value: string;
    label: string;
    min: string;
    max: string;
};

type FiltersProps = {
    filters: FilterType[],
    onFilterChange: (sectionId: string, fromToKey: string, optionValue: string) => void;
}
const DateFiltersComponent = (props: FiltersProps) => {
    const handleDateChange = (sectionId: string, fromToKey: string, optionValue: string) => {
        props.onFilterChange(sectionId, fromToKey, optionValue);
    };


    return (
        <div className="grid grid-cols-1 gap-x-8 gap-y-10">
            {/* Filters */}
            <form className="hidden lg:block">
                {
                    // @ts-ignore
                    props.filters.map((section: {
                        to: any;
                        id: string; name: string; from: any;
                    }) => (
                        <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                            <h3 className="-my-3 flow-root">
                                <DisclosureButton
                                    className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                    <span className="font-medium text-gray-900">{section.name}</span>
                                    <span className="ml-6 flex items-center">
                                    <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden"/>
                                    <MinusIcon aria-hidden="true"
                                               className="h-5 w-5 [.group:not([data-open])_&]:hidden"/>
                                </span>
                                </DisclosureButton>
                            </h3>
                            <DisclosurePanel className="pt-6">
                                <div className="space-y-4">
                                    {
                                        section.from ?
                                            <div className="sm:col-span-3">
                                                <label htmlFor={`${section.id}_from`}
                                                       className="block text-sm font-medium leading-6 text-gray-900">
                                                    {section.from.label}:
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="date"
                                                        name={`${section.id}[from]`}
                                                        max={section.from.max ?? ''}
                                                        min={section.from.min ?? ''}
                                                        id={`${section.id}_from`}
                                                        value={section.from.value ?? ''}
                                                        className={`block w-1/3 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6`}
                                                        onChange={(event) => handleDateChange(`${section.id}`, 'from', event.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            : null
                                    }
                                    {
                                        section.to ?
                                            <div className="sm:col-span-3">
                                                <label htmlFor={`${section.id}_to`}
                                                       className="block text-sm font-medium leading-6 text-gray-900">
                                                    {section.to.label}:
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="date"
                                                        name={`${section.id}[to]`}
                                                        max={section.to.max ?? ''}
                                                        min={section.to.min ?? ''}
                                                        id={`${section.id}_to`}
                                                        value={section.to.value ?? ''}
                                                        className={`block w-1/3 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6`}
                                                        onChange={(event) => handleDateChange(`${section.id}`, 'to', event.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            : null
                                    }
                                </div>
                            </DisclosurePanel>
                        </Disclosure>
                    ))}
            </form>
        </div>
    )
};

export default DateFiltersComponent;