export type TimelineEventType = 'breakthrough' | 'battle' | 'treasure' | 'encounter' | 'parting' | 'secret_realm' | 'key_decision';

export interface TimelineEvent {
  id: string;
  sortOrder: number;
  title: string;
  timeLabel: string;
  chapter: string;
  description: string;
  type: TimelineEventType;
  location: string;
  relatedCharacterIds: string[];
  relatedArtifactIds: string[];
  positionPercent: { x: number; y: number };
  branchIndex: number;
}

export interface TimelineArc {
  id: string;
  label: string;
  startEventIndex: number;
  endEventIndex: number;
  colorAccent: string;
}
