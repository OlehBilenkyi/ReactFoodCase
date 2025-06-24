// src/components/OrderFeatures/index.js

// DatePickerModal (если собираетесь импортировать его напрямую)
// export { default as DatePickerModal } from "./DatePickerModal/DatePickerModal";

// Форма доставки

// Провайдер модалок
export { default as ModalProvider } from "./ModalManager/ModalManager";
// После изменений useModal.js экспортируется как default
export { default as useModal } from "./ModalManager/useModal";

// Многошаговая форма
export { default as MultiStepForm } from "./MultiStepForm/MultiStepForm";

// Выбор пакетов
export { default as PackageSelection } from "./PackageSelection/PackageSelection";
export { default as PackageWidget } from "./PackageWidget/PackageWidget";

export { default as OrderTotalPackage } from "./OrderTotalPackage/OrderTotalPackage";
export { default as StandardOrderSummary } from "./StandardOrderSummary/StandardOrderSummary";
