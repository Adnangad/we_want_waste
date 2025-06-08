import React from "react";
import clsx from "clsx";

const CheckIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 md:w-8 md:h-8"
        viewBox="0 0 1024 1024"
    >
        <path
            fill="currentColor"
            d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0zm0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01zm204.336-636.352L415.935 626.944l-135.28-135.28c-12.496-12.496-32.752-12.496-45.264 0c-12.496 12.496-12.496 32.752 0 45.248l158.384 158.4c12.496 12.48 32.752 12.48 45.264 0c1.44-1.44 2.673-3.009 3.793-4.64l318.784-320.753c12.48-12.496 12.48-32.752 0-45.263c-12.512-12.496-32.768-12.496-45.28 0z"
        />
    </svg>
);

const steps = [
    { key: "location", label: "Location" },
    { key: "wasteType", label: "Waste Type" },
    { key: "selectSkip", label: "Select Skip" },
    { key: "permitCheck", label: "Permit Check" },
    { key: "chooseDate", label: "Choose Date" },
    { key: "payment", label: "Payment" },
];

export default function Progress() {
    const completedStepsSet = new Set(["location", "wasteType"]);

    return (
        <div className="w-full mt-6 py-5 px-4 md:px-8 dark:bg-zinc-700 bg-white top-0 z-50 sticky overflow-x-auto">
            <div className="flex items-center justify-start md:justify-between min-w-[600px] md:min-w-full space-x-4">
                {steps.map((step, index) => {
                    const isCompleted = completedStepsSet.has(step.key);
                    const isLast = index === steps.length - 1;

                    return (
                        <React.Fragment key={step.key}>
                            <div
                                className={clsx(
                                    "flex flex-col items-center gap-1 font-serif text-sm md:text-base",
                                    isCompleted
                                        ? "text-green-600 dark:text-blue-400"
                                        : "text-gray-600 dark:text-white"
                                )}
                            >
                                {CheckIcon}
                                <span className="cursor-pointer text-black dark:text-white text-center">
                                    {step.label}
                                </span>
                            </div>
                            {!isLast && (
                                <div
                                    className={clsx(
                                        "h-1 rounded-full",
                                        "w-6 md:w-12 lg:w-20 xl:w-24",
                                        isCompleted ? "bg-green-600 dark:bg-blue-400" : "bg-gray-400"
                                    )}
                                />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
}
