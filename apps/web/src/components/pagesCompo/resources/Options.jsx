import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';

const Options = ({ title, options, onBack, onSelect }) => (
    <section className="relative z-10 max-w-5xl mx-auto px-6 -mt-28 w-full pb-24">
        <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-xl sm:p-10">
            <button
                type="button"
                onClick={onBack}
                className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-900 transition-colors hover:text-blue-600 cursor-pointer"
            >
                <FiArrowLeft size={16} />
                Back to resources
            </button>
            <h2 className="mb-2 text-2xl font-extrabold text-[#0A246B] sm:text-3xl">
                {title}
            </h2>
            <p className="mb-7 text-sm text-slate-600">
                Select the edition you would like to read.
            </p>

            <div className="flex flex-col gap-4">
                {options.map((option) => (
                    <div
                        key={option.title}
                        className={`flex w-full items-center justify-between gap-4 rounded-2xl border p-5 text-left sm:px-7 ${
                            option.disabled
                                ? 'border-slate-200 bg-slate-100 text-slate-500'
                                : 'border-blue-800/20 bg-gradient-to-r from-[#163B99] to-[#0A246B] text-white shadow-md'
                        }`}
                    >
                        <span>
                            <span className="block text-xl font-extrabold sm:text-2xl">{option.title}</span>
                            <span className={`mt-1 block text-sm ${option.disabled ? '' : 'text-blue-100'}`}>
                                {option.description}
                            </span>
                        </span>
                        <button
                            type="button"
                            disabled={option.disabled}
                            onClick={() => onSelect(option)}
                            className={`shrink-0 rounded-lg px-4 py-2 text-sm font-bold transition ${
                                option.disabled
                                    ? 'cursor-not-allowed bg-slate-200'
                                    : 'cursor-pointer bg-[#FBBF24] text-[#061838] hover:bg-yellow-400'
                            }`}
                        >
                            {option.actionLabel || (option.disabled ? 'COMING SOON' : 'OPEN')}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default Options;
