package com.rentalcar.service.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.rentalcar.dao.StatisticsDataRepo;
import com.rentalcar.entity.StatisticsData;
import com.rentalcar.service.StatisticsService;

@Service
public class StatisticsServiceImpl implements StatisticsService{
	@Autowired
    private StatisticsDataRepo StatisticsDataRepo;

	
	
	/**
	 * @param statDate
	 * @return
	 * @see com.rentalcar.dao.StatisticsDataRepo#findByStatDate(java.time.LocalDate)
	 */
	public Optional<StatisticsData> findByStatDate(LocalDate statDate) {
		return StatisticsDataRepo.findByStatDate(statDate);
	}

	/**
	 * @param <S>
	 * @param entity
	 * @return
	 * @see org.springframework.data.repository.CrudRepository#save(java.lang.Object)
	 */
	public <S extends StatisticsData> S save(S entity) {
		return StatisticsDataRepo.save(entity);
	}

	/**
	 * @param sort
	 * @return
	 * @see org.springframework.data.repository.ListPagingAndSortingRepository#findAll(org.springframework.data.domain.Sort)
	 */
	public List<StatisticsData> findAll(Sort sort) {
		return StatisticsDataRepo.findAll(sort);
	}

	/**
	 * 
	 * @see org.springframework.data.jpa.repository.JpaRepository#flush()
	 */
	public void flush() {
		StatisticsDataRepo.flush();
	}

	/**
	 * @param pageable
	 * @return
	 * @see org.springframework.data.repository.PagingAndSortingRepository#findAll(org.springframework.data.domain.Pageable)
	 */
	public Page<StatisticsData> findAll(Pageable pageable) {
		return StatisticsDataRepo.findAll(pageable);
	}

	/**
	 * @return
	 * @see org.springframework.data.repository.ListCrudRepository#findAll()
	 */
	public List<StatisticsData> findAll() {
		return StatisticsDataRepo.findAll();
	}

	/**
	 * @param ids
	 * @return
	 * @see org.springframework.data.repository.ListCrudRepository#findAllById(java.lang.Iterable)
	 */
	public List<StatisticsData> findAllById(Iterable<Long> ids) {
		return StatisticsDataRepo.findAllById(ids);
	}

	/**
	 * @param id
	 * @return
	 * @see org.springframework.data.repository.CrudRepository#findById(java.lang.Object)
	 */
	public Optional<StatisticsData> findById(Long id) {
		return StatisticsDataRepo.findById(id);
	}

	/**
	 * @param id
	 * @return
	 * @see org.springframework.data.repository.CrudRepository#existsById(java.lang.Object)
	 */
	public boolean existsById(Long id) {
		return StatisticsDataRepo.existsById(id);
	}

	/**
	 * @param <S>
	 * @param example
	 * @return
	 * @see org.springframework.data.repository.query.QueryByExampleExecutor#count(org.springframework.data.domain.Example)
	 */
	public <S extends StatisticsData> long count(Example<S> example) {
		return StatisticsDataRepo.count(example);
	}

	/**
	 * @param id
	 * @return
	 * @deprecated
	 * @see org.springframework.data.jpa.repository.JpaRepository#getOne(java.lang.Object)
	 */
	public StatisticsData getOne(Long id) {
		return StatisticsDataRepo.getOne(id);
	}

	/**
	 * @return
	 * @see org.springframework.data.repository.CrudRepository#count()
	 */
	public long count() {
		return StatisticsDataRepo.count();
	}

	/**
	 * @param id
	 * @see org.springframework.data.repository.CrudRepository#deleteById(java.lang.Object)
	 */
	public void deleteById(Long id) {
		StatisticsDataRepo.deleteById(id);
	}

	/**
	 * @param id
	 * @return
	 * @deprecated
	 * @see org.springframework.data.jpa.repository.JpaRepository#getById(java.lang.Object)
	 */
	public StatisticsData getById(Long id) {
		return StatisticsDataRepo.getById(id);
	}

	/**
	 * @param entity
	 * @see org.springframework.data.repository.CrudRepository#delete(java.lang.Object)
	 */
	public void delete(StatisticsData entity) {
		StatisticsDataRepo.delete(entity);
	}

	/**
	 * @param id
	 * @return
	 * @see org.springframework.data.jpa.repository.JpaRepository#getReferenceById(java.lang.Object)
	 */
	public StatisticsData getReferenceById(Long id) {
		return StatisticsDataRepo.getReferenceById(id);
	}

	/**
	 * 
	 * @see org.springframework.data.repository.CrudRepository#deleteAll()
	 */
	public void deleteAll() {
		StatisticsDataRepo.deleteAll();
	}

	/**
     * Tạo hoặc cập nhật thống kê cho ngày hiện tại.
     */
    public StatisticsData createOrUpdateStatisticsForToday() {
        LocalDate today = LocalDate.now();

        // Tìm bản ghi theo ngày
        Optional<StatisticsData> optionalStatistics = StatisticsDataRepo.findByStatDate(today);

        if (optionalStatistics.isPresent()) {
            // Nếu đã có, cập nhật các trường cần thiết
        	StatisticsData existingStatistics = optionalStatistics.get();
            //updateCarStatistics(existingStatistics); // Hàm cập nhật logic tùy ý
            return StatisticsDataRepo.save(existingStatistics);
        } else {
            // Nếu chưa có, tạo mới bản ghi
        	StatisticsData newStatistics = new StatisticsData();
            newStatistics.setStatDate(today);
            newStatistics.setTotalCarRentals(0);
            newStatistics.setTotalMotorbikeRentals(0);
            newStatistics.setTotalRevenue(0.0);
            newStatistics.setTotalCustomers(0);
            // Thêm các trường khác nếu cần
            return StatisticsDataRepo.save(newStatistics);
        }
    }
    
    /**
     * Hàm cập nhật logic cho bản ghi thống kê oto hiện tại.
     */
    private void updateMotorbikeStatistics(StatisticsData StatisticsData) {
        // Ví dụ: Tăng số lượng lượt thuê
    	StatisticsData.setTotalMotorbikeRentals(StatisticsData.getTotalMotorbikeRentals() + 1);
        // Có thể thêm logic khác, như cập nhật doanh thu, giảm giá...
    }

    /**
     * Hàm cập nhật logic cho bản ghi thống kê oto hiện tại.
     */
    private void updateCarStatistics(StatisticsData StatisticsData) {
        // Ví dụ: Tăng số lượng lượt thuê
    	StatisticsData.setTotalCarRentals(StatisticsData.getTotalCarRentals() + 1);
        // Có thể thêm logic khác, như cập nhật doanh thu, giảm giá...
    }
	
	
}
