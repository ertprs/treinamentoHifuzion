from rest_framework import routers

from academy.views import (
    CoachViewSet,
    AthleteViewSet,
    GraduationViewSet,
    TeamViewSet,
    TrainingViewSet,
    MeasureViewSet
)

router = routers.DefaultRouter()
router.register('coaches', CoachViewSet)
router.register('athletes', AthleteViewSet)
router.register('graduations', GraduationViewSet)
router.register('teams', TeamViewSet)
router.register('trainings', TrainingViewSet)
router.register('measures', MeasureViewSet)

urlpatterns = router.urls
