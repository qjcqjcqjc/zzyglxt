package com.zyyglxt.util;

import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.CulturalResourcesDO;
import com.zyyglxt.dataobject.IndustrialDevelopSciAchiDO;
import com.zyyglxt.dto.ChineseCulturalDto;
import com.zyyglxt.dto.CulturalResourcesDto;
import com.zyyglxt.dto.industrialDevelop.IndustrialDevelopSciAchiDODto;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;

/**
 * Author:wangzh
 * Date: 2020/11/6 15:39
 * Version: 1.0
 */
public class ConvertDOToDTOUtil {

    public static ChineseCulturalDto convertFromDOToDTO(ChineseCulturalDO chineseCulturalDO, String filePath){
        filePath = StringUtils.isEmpty(filePath) ? "已经损坏了" : filePath;
        ChineseCulturalDto chineseCulturalDto = new ChineseCulturalDto();
        BeanUtils.copyProperties(chineseCulturalDO,chineseCulturalDto);
        chineseCulturalDto.setFilePath(filePath);
        return chineseCulturalDto;
    }

    public static CulturalResourcesDto convertFromDOToDTO(CulturalResourcesDO culturalResourcesDO, String filePath){
        filePath = StringUtils.isEmpty(filePath) ? "已经损坏了" : filePath;
        CulturalResourcesDto culturalResourcesDto = new CulturalResourcesDto();
        BeanUtils.copyProperties(culturalResourcesDO,culturalResourcesDto);
        culturalResourcesDto.setFilePath(filePath);
        return culturalResourcesDto;
    }

    public static CulturalResourcesDto convertFromDOToDTO(CulturalResourcesDO culturalResourcesDO, String filePath, String fileName){
        filePath = StringUtils.isEmpty(filePath) ? "已经损坏了" : filePath;
        CulturalResourcesDto culturalResourcesDto = new CulturalResourcesDto();
        BeanUtils.copyProperties(culturalResourcesDO,culturalResourcesDto);
        culturalResourcesDto.setFilePath(filePath);
        culturalResourcesDto.setFileName(fileName);
        return culturalResourcesDto;
    }

    public static IndustrialDevelopSciAchiDODto convertFromDOToDTO(IndustrialDevelopSciAchiDO industrialDevelopSciAchiDO, String filePath, String fileName){
        filePath = StringUtils.isEmpty(filePath) ? "已经损坏了" : filePath;
        IndustrialDevelopSciAchiDODto industrialDevelopSciAchiDODto = new IndustrialDevelopSciAchiDODto();
        BeanUtils.copyProperties(industrialDevelopSciAchiDO,industrialDevelopSciAchiDODto);
        industrialDevelopSciAchiDODto.setFilePath(filePath);
        industrialDevelopSciAchiDODto.setFileName(fileName);
        return industrialDevelopSciAchiDODto;
    }
}
