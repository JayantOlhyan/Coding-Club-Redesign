export const COHORT = {
  startDate: "2026-10-06", // real batch start per PRD §9
  showCountdown: false, // client toggles
  batchLabelPrefix: "Next batch starts",
  countdownLabel: "Batch starts in",
};

// Build-time assertion: throw if startDate is earlier than the build date
const today = new Date();
today.setHours(0, 0, 0, 0);
const cohortDate = new Date(COHORT.startDate);
if (isNaN(cohortDate.getTime())) {
  throw new Error(`[COHORT CONFIG DEFECT] Invalid date format for COHORT.startDate: "${COHORT.startDate}"`);
}
if (cohortDate < today) {
  throw new Error(
    `[COHORT CONFIG DEFECT] COHORT.startDate ("${COHORT.startDate}") is earlier than build date ("${today.toISOString().slice(0, 10)}"). A stale cohort date cannot be deployed.`
  );
}

