// YearlyTimeline.tsx - Componente principal
import { activities } from './timeLineData';
import { MonthMarker, ActivityCard } from './timeLine';

export function YearlyTimeline() {
	return (
		<div className="relative mx-auto py-8">
			{/* Línea vertical */}
			<div className="absolute left-0 md:left-[80px] top-0 bottom-0 w-1 bg-gray-200 dark:bg-gray-700"></div>

			<div className="space-y-8">
				{activities.map((month) => (
					<div key={month.month} className="mb-8">
						{/* Encabezado del mes */}
						<MonthMarker month={month.month} />

						{/* Actividades del mes */}
						<div className="space-y-6">
							{month.activities.map((activity) => (
								<ActivityCard key={activity.name} activity={activity} />
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
