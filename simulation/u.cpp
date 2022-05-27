#include <cmath>
#include <fstream>
#include "u.h"

U::U() {}

U::U(double b, double s, double x, double v, double theta, double omega) {
    baseLength_m = b;
    sideHeight_m = s;
    position_m = x;
    velocity_m_s = v;
    angular_position_rad = theta;
    angular_velocity_rad_s = omega;

    centerOfMass_m = computeCenterOfMass(b, s);
}

double U::computeDistanceFromGround() {
    double centerOfMassHeight;
    double tolerance = 1e-6;
    
    if (std::fabs(angular_position_rad - M_PI) < tolerance) {
        centerOfMassHeight = sideHeight_m - centerOfMass_m;
    } else if (
        angular_position_rad >= M_PI / 2 && 
        angular_position_rad <= 3 * M_PI / 2
    ) {
        centerOfMassHeight = (
            baseLength_m + std::cos(M_PI - angular_position_rad) * 
            (2 * (sideHeight_m - centerOfMass_m) * 
            std::sin(M_PI - angular_position_rad) -
            baseLength_m * std::cos(M_PI - angular_position_rad))
        ) / (2 * std::sin(M_PI - angular_position_rad));
    } else {
        centerOfMassHeight = centerOfMass_m / std::cos(angular_position_rad) + 
            std::sin(angular_position_rad) * (baseLength_m / 2 - 
            centerOfMass_m * std::tan(angular_position_rad));
    }

    return position_m - centerOfMassHeight;
}

bool U::isTouchingGround() {
    double distanceFromGround = computeDistanceFromGround();

    if (distanceFromGround <= 0) {
        return true;
    } else {
        return false;
    }
}

void U::writeDimensions() {
    std::ofstream file("data/dimensions.tsv");
    file << centerOfMass_m << "\t";
    file << baseLength_m << "\t";
    file << sideHeight_m << "\n";
    file.close();
}

double U::computeCenterOfMass(double b, double s) {
    return s * s / (2 * s + b);
}
